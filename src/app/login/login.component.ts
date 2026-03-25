import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImplicitAutenticationService } from '../@core/utils/';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  appname = 'verificacion';
  basePathAssets = environment.ASSETS_SERVICE;

  @Input('isloading') isloading: boolean = false;
  @Output() loginEvent: EventEmitter<any> = new EventEmitter();

  constructor(private autenticacion: ImplicitAutenticationService) {}

  login() {
    this.isloading = true;
    this.loginEvent.next('clicked');
    this.autenticacion.login();
  }

  ngOnInit(): void {}
}