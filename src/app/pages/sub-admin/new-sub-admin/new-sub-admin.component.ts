import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS } from '@constant/constants';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from '@services/utility.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

import { RegexEnum } from '../../../global/regex-enum';

import { FormService } from '../../../services/form.service';
import { SubAdminService } from '../sub-admin.service';

@Component({
  selector: 'app-new-sub-admin',
  templateUrl: './new-sub-admin.component.html',
  styleUrls: ['./new-sub-admin.component.scss']
})
export class NewSubAdminComponent implements OnInit {
  newSubAdminForm: FormGroup;
  messageList: any = {};

  constructor( private formBuilder: FormBuilder,
    public translation: TranslateService, private formService: FormService
     ,private localStorage: LocalStorageService ,private utilityService:UtilityService
     , private subadmin:SubAdminService) { }

  ngOnInit(): void {
    this.intializingnewSubAdminForm();
    this.intializingMessage();
  }

  intializingnewSubAdminForm() {
   
    return this.newSubAdminForm = this.formBuilder.group({
      Name: ['', [Validators.required,  Validators.pattern(RegexEnum.name)]],
      mobile : ['', [Validators.required,  Validators.pattern(RegexEnum. mobile)]],
      email: ['', [Validators.required,  Validators.pattern(RegexEnum.email )]],
    });
  }

  intializingMessage() {
           
    this.messageList.Name = {
      pattern: this.translation.instant('Only Character allowed'),
      required: this.translation.instant('Title required'),
    };
    
    this.messageList.mobile = {
      pattern: this.translation.instant('Only Number allowed'),
      required: this.translation.instant('Mobile Number  required'),
    };

    this.messageList.email = {
      pattern: this.translation.instant('Invalid email'),
      required: this.translation.instant('Email Id  required'),
    };

   

  }


  get newSubAdminFormControls() { return this.newSubAdminForm.controls; }

   async onCreateEvent(){
    console.log(this.newSubAdminForm.value)
    this.formService.markFormGroupTouched(this.newSubAdminForm);

    if (this.newSubAdminForm.valid) {
      
      // this.ngxLoader.start();
      const sendData = await this.utilityService.cleanObject(this.newSubAdminForm.getRawValue());
     
     const response: any = await this.subadmin.addSubAdmin(sendData);
      if (response.msg == "Success") {
        
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.EMAIL, sendData.email);
      
        const initialState = {};
    
        //  await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, sendData.mobile);
      }
    }
  }

}
