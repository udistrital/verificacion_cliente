import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
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
  liveTokenValue: boolean = false;
  username = '';
  userMenu = [{ title: 'ver todas', icon: 'fa fa-list' }];
  public noNotify: any = '0';
  public activeLang = 'es';
  toggle: boolean;
  clientes$: Observable<boolean>;


  constructor(private sidebarService: NbSidebarService,
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
      const { user, userService } = data;
      console.info({ user, userService });
      this.username = typeof user.email !== 'undefined' ? user.email : typeof userService.email !== 'undefined' ? userService.email : '';
      this.liveTokenValue = this.username !== '';
    });

  }


  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);
    // this.clientes$ = this.catalogoService.getEstado$();
    // this.clientes$.subscribe(cliente => this.toggle = cliente);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  liveToken() {
    if (this.autenticacion.live()) {
      this.liveTokenValue = this.autenticacion.live();
      this.username = (this.autenticacion.getPayload()).sub;
    }
    return this.autenticacion.live();
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
    // this.catalogoService.CambiarEstado()
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
