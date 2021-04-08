import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { constants, LOCAL_STORAGE_KEYS ,ROUTE_PATHS  } from '../../../constants/constants';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { FormService } from '@services/form.service';
import { RegexEnum } from 'src/app/global/regex-enum';
import { AuthenticationService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private response: Subject<any>;
  forgotForm: FormGroup;
  messageList: any = {};
  showEmail;
  email = constants.EMAIL;
  mobileNumber = constants.MOBILE_NUMBER;
  type;

  constructor(
    private formBuilder: FormBuilder,
    public translation: TranslateService,
    private formService: FormService,
    private authService: AuthenticationService,
    private localStorage: LocalStorageService,
    // private ngxLoader: NgxUiLoaderService,
    private router:Router
  ) { }

  ngOnInit() {
    this.response = new Subject();
    this.intializingForgotForm();
    this.intializingMessage();
  }

  intializingForgotForm() {
    return this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern(RegexEnum.email)]],
      type: [this.email, Validators.required]
    });
  }

  intializingMessage() {
    this.messageList.mobile = {
      pattern: this.translation.instant('Enter valid Mobile Number'),
      required: this.translation.instant('Mobile Number required'),
    };

    this.messageList.email = {
      pattern: this.translation.instant('Enter valid email id'),
      required: this.translation.instant(' Email Id required'),
    };
  }

  onHide() {
    // this.modalRef.hide();
  }

  onLogin() {
    this.onHide();
    const initialState = {};
  }

  typeSelected() {
    if (this.forgotForm.value.type === this.email) {
      this.showEmail = true;
      this.forgotForm.addControl('email', new FormControl('', [Validators.required, Validators.pattern(RegexEnum.email)]));
      this.forgotForm.get('mobile').setValue(null);
      this.forgotForm.get('mobile').setErrors(null);
    } else {
      this.showEmail = false;
      this.forgotForm.get('email').setValue(null);
      this.forgotForm.get('email').setErrors(null);
      this.forgotForm.get('mobile').setValidators([Validators.required, , Validators.pattern(RegexEnum.mobile)]);
    }
  }
  async onForgotPassword() {
      debugger
 this.formService.markFormGroupTouched(this.forgotForm);
    if (this.forgotForm.valid) {
    
      // this.ngxLoader.start();
      const data: any = this.forgotForm.getRawValue();
      await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.EMAIL, data.email);
      if (data.email) {
        const response: any = await this.authService.forgotPassword({ email: data.email });
        if ( response && response.code == 200) {

          await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.EMAIL, response.result.email);
          
          this.router.navigate(['reset-password']);
        }
      } else {
        this.onHide();
        const response: any = await this.authService.forgotPassword({ email: data.email });
      }

    }
  }


}
