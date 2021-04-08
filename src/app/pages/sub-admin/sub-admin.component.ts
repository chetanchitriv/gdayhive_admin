import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SubAdminService } from './sub-admin.service';
@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss']
})
export class SubAdminComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  persons: any;

   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private httpClient: HttpClient ,private subadmin:SubAdminService) { }
list:any;
eventlist

// async getSubAdminList(){
//   const response:any = await this.subadmin.getAdmin();
//   if(response.msg=="Success"){
//     this.subadmin=response.list;
//     console.log(response.data)
//   }
// }
  ngOnInit(): void {
// this.getSubAdminList()
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   searching: false,
    // };
    // this.httpClient.get<[]>('https://60476f3cb801a40017ccc257.mockapi.io/data')
    // .subscribe(data => {
    //   this.persons = data;
    //   // Calling the DT trigger to manually render the table
    //   this.dtTrigger.next();
    // });
  }

  


}
