import { HttpErrorInterceptor } from './_Interceptor/error.interceptor';
import { AuthInterceptor } from './_Interceptor/auth.Interceptor';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { AuthGuard } from './_guards/auth.guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LayoutService } from './utils/layout.service';
import { StateService } from './utils/state.service';
import { ImplicitAutenticationService } from './utils/implicit_autentication.service';
import { LoaderService } from './utils/load.service';
import { UtilidadesService } from './utils/utilidades.service';
import { AutenticationService } from './utils/authentication.service';

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  LayoutService,
  AnalyticsService,
  StateService,
  ImplicitAutenticationService,
  LoaderService,
  UtilidadesService,
  AutenticationService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
