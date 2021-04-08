import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LayoutService, LayoutStore } from 'angular-admin-lte';

import { NavigationEnd, Router } from '@angular/router';
import { HttpRequestsService } from '@services/http-requests.service';
import { environment } from 'src/environments/environment';
import { adminLteConf } from './admin-lte.conf';
import { SharedService } from '@shared/shared.service';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public title = 'angular-starter';
  public isCustomLayout: boolean;
  public sideMenu = adminLteConf.sidebarLeftMenu;
  public currentPage = '';
  public isCollapsed = false;
  public image: string;
  public editAdmin: any;
  public imageName: any;
  public activeMenu: any = '';
  public agenda = '-';
  public event = '-';
  public todo = '-';
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private httpService: HttpRequestsService,
    public translate: TranslateService,
    public shared: SharedService,
    private cd: ChangeDetectorRef,
    public layoutStore: LayoutStore,
  ) {
    translate.setDefaultLang('en');
  }

  public async ngOnInit() {

  }

  public activeClass(currentRoute, tag, parentRount: any = '') {
    currentRoute = currentRoute.toLowerCase().replace(' ', '-');
    if (parentRount) {
      parentRount = parentRount.toLowerCase().replace(' ', '-');
    }
    if (tag === 'li') {
      if (this.currentPage.includes('admin/home')) {
        this.currentPage = this.currentPage.replace('admin/', '');
      }
      if (this.currentPage.includes('home') === true && currentRoute === 'dashboard') {
        this.activeMenu = '';
        return 'active mm-active';
      } else if (this.currentPage.includes(currentRoute.toLowerCase()) === true) {
        this.activeMenu = 'menuHover';
        return 'mm-active menu-open active';
      } else {
        return '';
      }
    } else if (tag === 'angle') {
      return 'fa fa-angle-left';

    } else if (tag === 'child1-li') {
      if (currentRoute === 'to-do') {
        currentRoute = 'todo';
      }
      if (currentRoute === 'housekeeping') {
        currentRoute = 'house-keeping';
      }

      if (this.currentPage.includes(currentRoute.toLowerCase()) === true && this.currentPage.includes(parentRount.toLowerCase()) === true) {
        this.activeMenu = 'menuHover';
        return 'mm-active menu-open active';
      } else {
        return '';
      }
    } else if (tag === 'child2-li') {
      if (currentRoute === 'certificates') {
        currentRoute = 'certifications';
      }
      if (currentRoute === 'sector-related') {
        currentRoute = 'sector';
        if (this.currentPage.includes('sector/usdaw')) {
          this.currentPage = this.currentPage.replace('usdaw/', '');
        }
      }
      if (currentRoute === 'interest-related') {
        currentRoute = 'interests';
        if (this.currentPage.includes('interests/usdaw')) {
          this.currentPage = this.currentPage.replace('usdaw/', '');
        }
      }
      if (currentRoute === 'courses') {
        if (this.currentPage.includes('courses/usdaw')) {
          this.currentPage = this.currentPage.replace('usdaw/', '');
        }
      }

      if (currentRoute === 'courses' || currentRoute === 'assessments') {
        if (this.currentPage.includes('training')) {
          this.currentPage = this.currentPage.replace('training', 'learning');
        }
      }
      if (this.currentPage.includes(currentRoute.toLowerCase()) === true && this.currentPage.includes(parentRount.toLowerCase()) === true) {
        return 'mm-active menu-open active';
      } else {
        return '';
      }
    } else if (tag === 'bedge') {
      if (currentRoute === 'to-do' || currentRoute === 'calendar-management' || currentRoute === 'agenda') {
        return '';
      } else {
        return 'hide';
      }
    } else {
      if (this.currentPage.includes(currentRoute.toLowerCase()) === true) {
        return 'mm-collapse mm-show';
      } else {
        return 'mm-collapse';
      }
    }
  }

  public collepsMenu() {
    $('li.menu1.mm-active.active').trigger('click');
    $('li.mm-active.active').trigger('click');
    $('li.menu-open').find('a').attr('aria-expanded', false);
    $('li.menu2.mm-active').removeClass('mm-active');
    $('li.menu1.mm-active').removeClass('mm-active');
    $('li.menu1.mm-active.active > a').trigger('click');
    $('li.menu1').find('.menu-open').removeClass('menu-open');
    $('ul.treeview-menu2').find('.mm-active').removeClass('mm-active');
    $('ul').find('.mm-collapse').removeClass('mm-show');
    this.cd.detectChanges();
  }

  public ngAfterViewInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const url = this.router.url.substr(1);
        this.currentPage = url;
        if ($('.sidebar-mini').hasClass('sidebar-collapse')) {
          setTimeout(() => {
            this.collepsMenu();
          }, 500);
        }
        if (val && val.url.includes('calendar/edit') && $('.Content3').height() === 0) {
          $('.Content3').height(320);
          $('.Content3').attr('aria-expanded', true);
          $('.Content3').parent().find('a').first().trigger('click');
        }
        this.cd.detectChanges();
        $('ul').find('.treeview-menu2').removeAttr('style');
      }
    });
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.isCustomLayout = value;
      this.cd.detectChanges();
      $('#side-menu').metisMenu({
        toggle: true, // disable the auto collapse. Default: true.
      });
    });
    this.layoutStore.isSidebarLeftCollapsed.subscribe((val) => {
      this.collepsMenu();
    });
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
