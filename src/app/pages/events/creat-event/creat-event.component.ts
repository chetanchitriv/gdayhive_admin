import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS } from '@constant/constants';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

import { RegexEnum } from '../../../global/regex-enum';

import { FormService } from '../../../services/form.service';

import { UtilityService } from '../../../services/utility.service';
 import {EventServiceService } from '../event-service.service'

@Component({
  selector: 'app-creat-event',
  templateUrl: './creat-event.component.html',
  styleUrls: ['./creat-event.component.scss']
})
export class CreatEventComponent implements OnInit {
  createEventForm: FormGroup;
  messageList: any = {};

  constructor(    private formBuilder: FormBuilder,
    public translation: TranslateService, private localStorage: LocalStorageService,
    private utilityService: UtilityService ,private formService: FormService, private creatEvent:EventServiceService) { }

  ngOnInit(): void {
    this.intializingCreateEventForm();
    this.intializingMessage();
  }

  intializingCreateEventForm() {
   
    return this.createEventForm = this.formBuilder.group({
      event_title: ['', [Validators.required,  Validators.pattern(RegexEnum.name)]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      description: ['', [Validators.required,Validators.pattern(RegexEnum.name)]],
      event_type: ['', [Validators.required]],
    });
  }

  intializingMessage() {
           
    this.messageList.event_title = {
      pattern: this.translation.instant('Only Character allowed'),
      required: this.translation.instant('Title required'),
    };
    this.messageList.start_date = {
      required: this.translation.instant('Start Date required'),
    };
    this.messageList.end_date = {
      required: this.translation.instant('End Date Required'),
    };

    this.messageList.start_time = {
      required: this.translation.instant('Start Time required'),
    };
    
    this.messageList.end_time = {
      required: this.translation.instant('End Time required'),
    };

    this.messageList.description = {
      pattern: this.translation.instant('Invalid Description'),
      required: this.translation.instant('Description required'),
    };

  }


  get createEventFormControls() { return this.createEventForm.controls; }

  async onCreateEvent(){
    console.log(this.createEventForm.value)
    this.formService.markFormGroupTouched(this.createEventForm);


    if (this.createEventForm.valid) {
      
      // this.ngxLoader.start();
      const sendData = await this.utilityService.cleanObject(this.createEventForm.getRawValue());
     
     const response: any = await this.creatEvent.addEvent(sendData);
      if (response.msg == "Success") {
        
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.EMAIL, sendData.email);
      
        const initialState = {};
    
        //  await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, sendData.mobile);
      }
    }
  }

}
