import { Component, OnDestroy } from '@angular/core';
import { delay, withLatestFrom, takeWhile } from 'rxjs/operators';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { StateService } from '../../../@core/utils';

// TODO: move layouts into the framework
@Component({
  selector: 'ngx-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  template: `
  <nb-layout [center]="layout.id === 'center-column'">
    <nb-layout-header fixed>
        <ngx-header [position]="sidebar.id === 'start' ? 'normal': 'inverse'"></ngx-header>
    </nb-layout-header>

    <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive [end]="sidebar.id === 'end'">
        <ng-content select="nb-menu"></ng-content>
    </nb-sidebar>

    <nb-layout-column (click)="clickOutside()" class="main-content">
        <ng-content select="router-outlet"></ng-content>
    </nb-layout-column>

    <nb-layout-footer fixed>
        <ngx-footer select="footer"></ngx-footer>
    </nb-layout-footer>

</nb-layout>

  `,
})
export class SampleLayoutComponent implements OnDestroy {


  layout: any = {};
  sidebar: any = {};

  private alive = true;

  currentTheme: string;

  constructor(protected stateService: StateService,
    protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService) {
    this.stateService.onLayoutState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((layout: string) => this.layout = layout);

    this.stateService.onSidebarState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });
    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {
        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');

        }
      });
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }
  clickOutside() {
    const xLBp = this.bpService.getByName('xl');
    const windowsize = window.innerWidth;
    // Funcion para check de tamaños.
    // const Overflow = this.bpService.getByWidth(1200)
    // console.log(Overflow)
    // console.log(windowsize)
    // console.log(xLBp)
    if (windowsize <= xLBp.width) {
      this.sidebarService.collapse('menu-sidebar');
    }

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
