import { Component, OnInit } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';


import { UserService } from '../user.service';
import { LOCAL_STORAGE_KEYS } from '@constant/constants';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
   data:any;
   persons :any;

  constructor( private user:UserService , private router:ActivatedRoute, private localStorage: LocalStorageService) {
    router.params.subscribe(params => {
      this.onUserDetails(this.router.snapshot.params.id);
    })
   }

  ngOnInit(): void {
  
  
   

  }  


  
  

  async onUserDetails(user_id:any) {
  
      debugger
      const result: any =  await this.user.userDetails({"draw":1,"order":[{"column":1,"dir":"asc"}],"start":0,"length":10,"search":{"value":"parth","regex":false},"userId" : user_id});
      this.persons = result.result.userdata;
      console.log(this.persons)



      // if (result && result.code==200) {
      //   await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.TOKEN,result.result.token);
      //   await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.FULLNAME, result.result.fullName); 
      // }
    
  }
  
 

  


  

  



}
