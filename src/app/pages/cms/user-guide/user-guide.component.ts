import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { RegexEnum } from '../../../global/regex-enum';

import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.scss']
})
export class UserGuideComponent implements OnInit {
  userGuideForm: FormGroup;
  messageList: any = {};

  constructor(    private formBuilder: FormBuilder,
    public translation: TranslateService, private formService: FormService,) { }

  ngOnInit(): void {
    this.intializinguserGuideForm();
    this.intializingMessage();
  }

  intializinguserGuideForm() {
   
    return this.userGuideForm = this.formBuilder.group({
      url: ['', [Validators.required,  Validators.pattern(RegexEnum.url)]],
     
    });
  }
  intializingMessage() {
           
    this.messageList.url = {
      pattern: this.translation.instant('invalid Url'),
      required: this.translation.instant('Url required'),
    };
  }

  get userGuideFormControls() { return this.userGuideForm.controls; }

  userGuid(){
    console.log(this.userGuideForm.value)
    this.formService.markFormGroupTouched(this.userGuideForm);
  }

}
