import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
  logoPath;
  headerText;
  profile;
  defaultUser;
  menu;
  constructor() { }
  async ngOnInit() {
    this.menu = [
      {
        id: 'd',
        icon: 'fas fa-tachometer-alt',
        title: 'Dashboard',
        link: '/dashboard'
      },
      {
        id: 'psp',
        icon: 'fas fa-th',
        title: 'PSP',
        link: '/psps'
      },
      {
        id: 'users',
        icon: 'fas fa-users',
        title: 'Users',
        menu: [
          {
            id: 'super-admin',
            icon: 'far fa-circle',
            title: 'Super Admin',
            link: '/users/super-admin',
          },
          {
            id: 'admin',
            icon: 'far fa-circle',
            title: 'Admin',
            link: '/users/admin',
          },
          {
            id: 'admin',
            icon: 'far fa-circle',
            title: 'Agents',
            link: '/users/agents',
          },
          {
            id: 'admin',
            icon: 'far fa-circle',
            title: 'Merchants',
            link: '/users/merchants',
          },
          {
            id: 'admin',
            icon: 'far fa-circle',
            title: 'PSPS',
            link: '/users/psps',
          }
        ]
      },
      {
        id: 'transaction',
        icon: 'fas fa-list-ul',
        title: 'Transactions',
        link: '/transactions'
      },
    ];

  }
}
