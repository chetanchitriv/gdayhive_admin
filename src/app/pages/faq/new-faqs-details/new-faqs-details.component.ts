import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { LOCAL_STORAGE_KEYS } from '@constant/constants';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { RegexEnum } from '../../../global/regex-enum';
import { FormService } from '../../../services/form.service';
import { UtilityService } from '../../../services/utility.service';
import { FaqsService } from '../faqs.service';

@Component({
  selector: 'app-new-faqs-details',
  templateUrl: './new-faqs-details.component.html',
  styleUrls: ['./new-faqs-details.component.scss']
})
export class NewFaqsDetailsComponent implements OnInit {

  newFaqsForm: FormGroup;
  messageList: any = {};


  constructor(private formBuilder: FormBuilder,
    public translation: TranslateService, private formService: FormService, private utilityService:UtilityService
    ,private faqs:FaqsService ,private localStorage: LocalStorageService,) { }

  ngOnInit(): void {
    this.intializingCreateEventForm();
    this.intializingMessage();
  }
      
  intializingCreateEventForm() {
   
    return this.newFaqsForm = this.formBuilder.group({
      answer: ['', [Validators.required,  Validators.pattern(RegexEnum.answer)]],
      question: ['', [Validators.required,  Validators.pattern(RegexEnum.question)]],
     
    });
  }

  intializingMessage() {
    this.messageList.question = {
      pattern: this.translation.instant('Only Character allowed'),
      required: this.translation.instant('Question   required'),
    };   
   

    this.messageList.answer = {
      pattern: this.translation.instant('Only Character allowed'),
      required: this.translation.instant('  Answer required'),
    };

}

get newFaqsFormControls() { return this.newFaqsForm.controls; }

  async onCreateEvent(){
  console.log(this.newFaqsForm.value)
  this.formService.markFormGroupTouched(this.newFaqsForm);

  if (this.newFaqsForm.valid) {
      
    // this.ngxLoader.start();
    const sendData = await this.utilityService.cleanObject(this.newFaqsForm.getRawValue());
   
   const response: any = await this.faqs.addFaqs(sendData);
    if (response.msg == "Success") {
      
      await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.EMAIL, sendData.email);
      console.log(response.msg)
      const initialState = {};
  
      //  await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, sendData.mobile);
    }
  }
}

}
