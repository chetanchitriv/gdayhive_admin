import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '@services/utility.service';
import { Message } from '@shared/models/messages';
import { HttpRequestsService } from '@services/http-requests.service';
import { SharedService } from '@shared/shared.service';
import { AuthenticationService } from '../../shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import {LOCAL_STORAGE_KEYS} from '../../constants/constants'
import { FormService } from '@services/form.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


public Message= Message;  
  public isRefresh: boolean;
  public loginParam: FormGroup;
  constructor(
    private fb: FormBuilder,
    public httpService: HttpRequestsService,
    public helper: UtilityService,
    public shared: SharedService,
    private authService: AuthenticationService,
    private localStorage: LocalStorageService,
    private formService: FormService,
   
    private router: Router) {
    this.isRefresh = false;
    this.loginParam = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', [Validators.maxLength(30), Validators.required]],
      admin: true
    });
  }

 
  

  /**
   * login(data, isValid) => check login credentials with api call @login
   * @param data in form control field value
   * @param isValid in form validation done or not
   */
  // login(data, isValid) {
  //   if (isValid) {
  //     this.helper.showLoading();
  //     localStorage.clear();
  //     this.helper.hideLoading();
  //     this.router.navigate(['/admin/home']);
  //     this.helper.hideLoading();
  //   } else if (String(data.userName).length === 0) {
  //     this.helper.showErrorToast(Message.txtUserName);
  //   } else if (this.loginParam.controls.userName.errors) {
  //     this.helper.showErrorToast(Message.txtEmailValid);
  //   } else if (!this.loginParam.controls.password.valid) {
  //     this.helper.showErrorToast(Message.txtPassword);
  //   } else {
  //     this.helper.showErrorToast(Message.txtCredentials);
  //   }
  // }



  
  async onLogin() {
    
    
    this.formService.markFormGroupTouched(this.loginParam);
    if (this.loginParam.valid) {
      let data = this.loginParam.getRawValue();
      data["email"] = (data.email);
      
      const result: any = await this.authService.login(data);
      console.log(result.result.token)
      if (result && result.result.token) {
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.TOKEN,result.result.token);
     
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.FULLNAME, result.result.fullName);
        localStorage.setItem("token",result.result.token);
      
              this.router.navigate(['/admin/home']);
      }
    }
  }


}
