import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sectorCount = 0;
  repsCount = 0;
  adminCount = 0;
  memberCount = 0;
  totalUserCount = 0;
  courseCount = 0;
  eventCount = 0;

  sendMessage(item?) {
    console.log(item?.foo % 2);
    // console.log(item.foo % 2); // Uncomment the code for handling error in GlobalErrorHandler
  }

  constructor(
    private router: Router,
  ) {
    this.sendMessage();
  }

  ngOnInit(): void {
  }

  redirect(val) {
    this.router.navigate([val]);
  }


}
