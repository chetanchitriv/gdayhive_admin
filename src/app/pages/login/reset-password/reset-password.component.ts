import { Component, OnInit } from '@angular/core';
import { ROUTE_PATHS, LOCAL_STORAGE_KEYS } from '@constant/constants';
import { RegexEnum } from 'src/app/global/regex-enum';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AuthenticationService } from 'src/app/shared/services/auth/auth.service';
import { FormService } from '@services/form.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { TranslateService } from '@ngx-translate/core/lib/translate.service';
import { Message } from '@pages/shared/models/messages';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public Message= Message;  

  public resetPasswordForm: FormGroup;
  private response: Subject<any>;
  private userId;
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private localStorage: LocalStorageService,
    private authService: AuthenticationService,
    private router:Router,
  ) { }

  async ngOnInit() {
    this.userId = await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.ID);
    this.response = new Subject();
    this.initializeResetPasswordForm();
  }

  onHide() {
  }

  initializeResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      recovery_code: ['', [
        Validators.required]
      ],
      password: ['', [
        Validators.required,
        Validators.pattern(RegexEnum.passwordValidation)]
      ],
      confirm_password: ['', [
        Validators.required]
      ],
    },
      { validator: UtilityService.MatchPassword }
    );
  }

 
  get resetPasswordFormControls() { return this.resetPasswordForm.controls; }


  async onResetPassword() {
    
    this.formService.markFormGroupTouched(this.resetPasswordForm);
    if (this.resetPasswordForm.valid) {
      // this.ngxLoader.start();
      let data = this.resetPasswordForm.getRawValue();
        console.log(data)
      data["email"] =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.EMAIL);
      data["code"] = Number(data["recovery_code"]);
      const response: any =  await this.authService.resetPassword(data);
        if (response && response.message) {
         this.router.navigate([ROUTE_PATHS.AUTH]);
      }
    }

    }
  
}
