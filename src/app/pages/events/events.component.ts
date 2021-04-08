import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import {EventServiceService} from './event-service.service'
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  data:any;
  eventList:any;
  dtOptions: DataTables.Settings = {};
  persons: any;

   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private httpClient: HttpClient ,private eventservice:EventServiceService) { }

  // async getSubcriptionList(){
  //   const response:any = await this.eventservice.getAllEvent();
  //   if(response.msg=="Success"){
  //     this.eventservice=response.data;
  //     console.log(response.data)
  //   }
  // }


  ngOnInit(): void {
    // this.getSubcriptionList()
  // this.eventList();

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10
    // };
    // this.httpClient.get<[]>('https://60476f3cb801a40017ccc257.mockapi.io/data')
    // .subscribe(data => {
    //   this.persons = data;
    //   // Calling the DT trigger to manually render the table
    //   this.dtTrigger.next();
    // });
  }

}
