import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { ImplicitAutenticationService } from '../../../@core/utils/implicit_autentication.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';

  user: any;
  title: any;

  itemClick: Subscription;
  liveTokenValue = false;
  username = '';
  userMenu = [{ title: 'ver todas', icon: 'fa fa-list' }];
  public noNotify: any = '0';
  public activeLang = 'es';
  toggle: boolean;
  clientes$: Observable<boolean>;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private layoutService: LayoutService,
    private autenticacion: ImplicitAutenticationService,
    public translate: TranslateService,
  ) {
    this.translate = translate;
    this.toggle = false;

    this.itemClick = this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });

    this.autenticacion.user$.subscribe((data: any) => {
      console.info('Usuario en header:', data);

      if (data) {
        this.username =
          data.nombre_usuario ||
          data.correo_electronico ||
          data.id_usuario ||
          '';

        this.liveTokenValue = this.username !== '';
      } else {
        this.username = '';
        this.liveTokenValue = false;
      }
    });
  }

  ngOnInit() {}

  useLanguage(language: string) {
    this.translate.use(language);
  }

  liveToken() {
    this.liveTokenValue = this.autenticacion.live();
    const payload = this.autenticacion.getPayload();
    this.username = payload
      ? (payload.nombre_usuario || payload.correo_electronico || payload.id_usuario || '')
      : '';
    return this.liveTokenValue;
  }

  login() {
    this.autenticacion.login();
  }

  onContecxtItemSelection(title) {
    if (title === 'ver todas') {
      this.router.navigate(['/pages/notificacion/listado']);
    }
  }

  logout() {
    this.autenticacion.logout('from header');
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  toggleNotifications(): boolean {
    this.sidebarService.toggle(false, 'notifications-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}