import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginService, LoaderBlockServiceService } from '../../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoaderBlockServiceService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private loaderService: LoaderBlockServiceService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  enter() {
    this.loaderService.show();
    this.loginService.login(this.formGroup.controls.login.value, this.formGroup.controls.password.value)
      .subscribe(() => {
        alert('Success');
        /////
        this.loginService.getUserInfo().subscribe(
          (user) => console.log(user));
        ////
        this.loaderService.hide();
      },
        (val) => {
          alert('Failed');
          this.loaderService.hide();
          console.log(val);
        });
  }
}
