import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap, finalize } from 'rxjs/operators';
import { PopUpManager } from '../../managers/popUpManager';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from '../utils/load.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private pUpManager: PopUpManager,
    private translate: TranslateService,
    public loaderService: LoaderService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    this.loaderService.show();
    const acces_token = window.localStorage.getItem('access_token');
    if (acces_token !== null) {


      // let authReq;
      // if (req.headers.get('Content-Type') === 'multipart/form-data') {
      //   authReq = req.clone({
      //     headers: new HttpHeaders({
      //       'Authorization': `Bearer ${acces_token}`,
      //     }),
      //   });
      // } else {
      //    authReq = req.clone({
      //     headers: new HttpHeaders({
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${acces_token}`,
      //     }),
      //   });
      // }

      const authReq = req.clone({
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${acces_token}`,
        }),
      });

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.

      // send cloned request with header to the next handler.
      return next.handle(authReq).pipe(
        tap(event => {
          // There may be other events besides the response.
          if (event instanceof HttpErrorResponse) {
            // cache.put(req, event); // Update the cache.
            this.router.navigate(['/']);
            this.pUpManager.showErrorAlert(this.translate.instant(`ERROR.${event['status']}`));
          } else {
            if (event['body']) {

              if (event['body'] !== null) {

                if (event['body']['Body'] !== undefined && event['body']['Body'] === null) {
                  this.pUpManager.showAlert('Alerta', 'No se encontraron Datos');
                }

              } else {
                this.pUpManager.showAlert('Alerta', 'No se encontraron Datos');
              }
            }
          }
        },
          (error: HttpErrorResponse) => {
            if (error.error && error.error.Message === 'Not found resource') {
              this.pUpManager.showErrorAlert('La firma ingresada no fue encontrada');
            } else if (error.error &&
              (error.error.Message === 'document not signed' || error.error.Message === 'electronic signatures do not match')) {
              this.pUpManager.showErrorAlert('La firma encontrada no coincide con la del documento original');
            } else {
              this.pUpManager.showErrorAlert(this.translate.instant(`ERROR.${error['status']}`));
            }
          },
        ),
        finalize(() => this.loaderService.hide()));
    } else {
      return next.handle(req).pipe(
        tap(event => {
          // There may be other events besides the response.
          if (event instanceof HttpErrorResponse) {
            // cache.put(req, event); // Update the cache.
            // this.snackBar.open('test', undefined, { duration: 5000 });
            this.pUpManager.showErrorAlert(this.translate.instant(`ERROR.${event['status']}`));
          } else {

            if (event['body']) {

              if (event['body'] !== null) {

                if (event['body']['Body'] !== undefined && event['body']['Body'] === null) {
                  this.pUpManager.showAlert('Alert', 'No se encontraron Datos');
                }

              } else {
                this.pUpManager.showAlert('Alert', 'No se encontraron Datos');
              }
            }
          }
        },
          (error: any) => {
            // this.snackBar.open('Error en el Servidor', undefined, { duration: 5000 });
            this.pUpManager.showErrorAlert(this.translate.instant(`ERROR.${error['status']}`));
          },
        ));
    }
  }
}
