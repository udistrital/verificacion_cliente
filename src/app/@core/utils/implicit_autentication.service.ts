import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImplicitAutenticationService {
  environment = environment;

  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  private logoutSubject = new BehaviorSubject<string>('');
  public logout$ = this.logoutSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  async init(_entorno?: any): Promise<any> {
    this.environment = _entorno || this.environment;
    console.log('Inicializando autenticación con entorno:', this.environment);

    this.httpClient.get<any>(
      this.environment.AUTH.ME_URL,
      { withCredentials: true },
    ).subscribe({
      next: (res) => {
        console.log('Respuesta de /me:', res);
        if (res) {
          this.userSubject.next(res);
        } else {
          this.userSubject.next(null);
        }
      },
      error: (error) => {
        console.log('Error consultando /me:', error);

        if (error.status === 401) {
          this.userSubject.next(null);
          return;
        }

        console.error('Error consultando /me:', error);
        this.userSubject.next(null);
      },
    });
  }

  public login(_flag?: boolean): void {
    window.location.href =
      `${this.environment.AUTH.LOGIN_URL}?app=${this.environment.AUTH.APP_CODE}`;
  }

  public logout(_action?: string): void {
    window.location.href =
      `${this.environment.AUTH.LOGOUT_URL}?app=${this.environment.AUTH.APP_CODE}`;
  }

  public live(): boolean {
    return !!this.userSubject.getValue();
  }

  public getMail(): Promise<string | null> {
    return new Promise((resolve) => {
      const user = this.userSubject.getValue();
      resolve(user && user.correo_electronico ? user.correo_electronico : null);
    });
  }

  public getPayload(): any {
    return this.userSubject.getValue();
  }
}