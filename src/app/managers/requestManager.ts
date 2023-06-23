import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorManager } from './errorManager';

/**
 * This class manage the http connections with internal REST services. Use the response format {
 *  Code: 'xxxxx',
 *  Body: 'Some Data' (this element is returned if the request is success)
 *  ...
 * }
 */
@Injectable({
  providedIn: 'root',
})
export class RequestManager {
  private path: string;
  public httpOptions: any;
  public httpOptions2: any;
  constructor(private http: HttpClient, private errManager: HttpErrorManager) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
    };
    this.httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };
  }


  /**
   * Use for set the source path of the service (service's name must be present at src/app/app-config.ts)
   * @param service: string
   */
  setPath(service: string) {
    this.path = environment[service];
    // console.log({resPath: this.path});
  }

  getPath(service: string) {
    return environment[service];
  }

  /**
   * Perform a GET http request
   * @param endpoint service's end-point
   * @param params (an Key, Value object with que query params for the request)
   * @returns Observable<any>
   */
  get(endpoint, params?) {
    const queryParams = new HttpParams();
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, value + '');
      }

    }
    this.httpOptions.params = queryParams;
    return this.http.get<any>(`${this.path}${endpoint}`, this.httpOptions).pipe(
      map(
        (res) => {
          if (res !== null && res.hasOwnProperty('Body')) {
            return res['Body'];
          } else {
            return res;
          }
        },
      ),
      catchError(this.errManager.handleError.bind(this)),
    );
  }

  /**
   * Perform a POST http request
   * @param endpoint service's end-point
   * @param element data to send as JSON
   * @returns Observable<any>
   */
  post(endpoint, element) {
    return this.http.post<any>(`${this.path}${endpoint}`, element, this.httpOptions).pipe(
      catchError(this.errManager.handleError),
    );
  }

  /**
   * Perform a POST http request
   * @param endpoint service's end-point
   * @param element data to send as JSON
   * @returns Observable<any>
   */
  post2(endpoint, element) {
    return this.http.post<any>(`${this.path}${endpoint}`, element, this.httpOptions2).pipe(
      catchError(this.errManager.handleError),
    );
  }


  /**
   * Perform a PUT http request
   * @param endpoint service's end-point
   * @param element data to send as JSON, With the id to UPDATE
   * @returns Observable<any>
   */
  put(endpoint, element) {
    return this.http.put<any>(`${this.path}${endpoint}/${element.Id}`, element, this.httpOptions).pipe(
      catchError(this.errManager.handleError),
    );
  }

  /**
   * Perform a PUT http request
   * @param endpoint service's end-point
   * @param element data to send as JSON
   * @param Id id from data
   * @returns Observable<any>
   */
  put2(endpoint, element, Id) {
    return this.http.put<any>(`${this.path}${endpoint}/${Id}`, element, this.httpOptions).pipe(
      catchError(this.errManager.handleError),
    );
  }

  /**
   * Perform a DELETE http request
   * @param endpoint service's end-point
   * @param id element's id for remove
   * @returns Observable<any>
   */
  delete(endpoint, id) {
    return this.http.delete<any>(`${this.path}${endpoint}/${id}`, this.httpOptions).pipe(
      catchError(this.errManager.handleError),
    );
  }
}
