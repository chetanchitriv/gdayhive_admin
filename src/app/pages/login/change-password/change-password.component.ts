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
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public Message= Message;  
  private response: Subject<any>;
  private userId;
  public resetPasswordForm: FormGroup;

  constructor( private fb: FormBuilder,
    private formService: FormService,
    private localStorage: LocalStorageService,
    private authService: AuthenticationService,
    private router:Router,) { }

    async ngOnInit() {
      this.userId = await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.ID);
      this.response = new Subject();
      this.initializeResetPasswordForm();
    }
  
    onHide() {
    }
   

    initializeResetPasswordForm() {
      this.resetPasswordForm = this.fb.group({
        old_password: ['', [
          Validators.required,
          Validators.pattern(RegexEnum.passwordValidation)]
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
          // data["email"] =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.MOBILE);
        
        const response: any =  await this.authService.changePassword(data);
        console.log(response);
        
          if (response && response.message==="Password Updated Successfully") {
            await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.EMAIL, response.email);
            // await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.EMAIL, this.resetPasswordForm.value.email);
           this.router.navigate([ROUTE_PATHS.AUTH]);
           const initialState = {};
        }
      }
  
      }

  }

























