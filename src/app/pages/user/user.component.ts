import { Component, OnInit, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';    
import { DataTableDirective } from 'angular-datatables';

  import {FaqsService} from '../faq/faqs.service'
import { UserService } from './user.service';
import { LOCAL_STORAGE_KEYS } from '@constant/constants';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnDestroy, OnInit {

  status=0;
 
  persons: any;
list:any;
   data = {"draw":1,"order":[{"column":1,"dir":"asc"}],"start":0,"length":10,"search":{"value":"parth","regex":false}};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  router: any;
  user_id: any;


  constructor(private httpClient: HttpClient ,private user:UserService , private localStorage: LocalStorageService) { }

   ngOnInit()  {
  
       
     this.onUser();
    

  }  
  



  async onUser() {
    
    
      const result: any = await this.user.userList({"draw":1,"order":[{"column":1,"dir":"asc"}],"start":0,"length":10,"search":{"value":"parth","regex":false}});
     this.persons = result.result.data;
     
      // if (result && result.code==200) {
      //   await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.TOKEN,result.result.token);
      //   await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.FULLNAME, result.result.fullName); 
      // 
  }
  
  async change(e,user_id:any){
      
    if(e.target.checked ,user_id  ){
       this.status = 0;
       
    }else{
       this.status = 1;
    }
   const response: any = await this.user.changeStatus({ "status" : this.status,});
   console.log(response)
    if (response.result.msg == "Success") {
      this.status=response.result
    
      await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.EMAIL,response.email);
    
      const initialState = {};
    }
console.log(e,user_id)
  }
 

   userdetails(id: string) {
    this.router.navigate(['/user/user-details', id]);
   }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
