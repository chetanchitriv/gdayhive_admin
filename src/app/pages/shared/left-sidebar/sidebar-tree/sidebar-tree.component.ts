import { Component, OnInit, Input } from '@angular/core';
// import { constants } from 'src/app/global/constants';

@Component({
  selector: 'app-sidebar-tree',
  templateUrl: './sidebar-tree.component.html',
  styleUrls: ['./sidebar-tree.component.scss']
})
export class SidebarTreeComponent implements OnInit {
  @Input() menu;

  constructor() { }
  async ngOnInit() { }
  toggleMenu(id: string) {
    if (id) {
      const element = document.getElementById(id);
      element.classList.toggle('menu-open');
    }
  }

}
