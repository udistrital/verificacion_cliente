/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ImplicitAutenticationService } from './@core/utils/implicit_autentication.service';
import { environment } from '../environments/environment';

const urlStyles = `@import url("${ environment.ASSETS_SERVICE }gaia-style.css");`;
@Component({
  selector: 'ngx-app',
  styles: [ urlStyles ],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private analytics: AnalyticsService,
    private translateService: TranslateService,
    private route: Router,
    private autenticacion: ImplicitAutenticationService) {
    this.autenticacion.user$.subscribe((data: any) => {
      const { user, userService } = data;
      if (user && userService) {
        this.route.navigateByUrl('pages');
      }
    });
  }
  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setDefaultLang('es');
    // this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.use('es');
  }
}
