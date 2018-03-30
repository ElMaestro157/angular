import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginService, LoaderBlockServiceService } from '../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoaderBlockServiceService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private loaderService: LoaderBlockServiceService,
    private router: Router) { }

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
        this.loaderService.hide();
        this.router.navigateByUrl('courses');
      },
        (val) => {
          alert('Failed');
          this.loaderService.hide();
          console.log(val);
        });
  }
}
