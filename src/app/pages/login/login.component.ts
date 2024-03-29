import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService, LoaderBlockServiceService, LoginService } from '../../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private _fb: FormBuilder,
    private _loginService: LoginService,
    private _loaderService: LoaderBlockServiceService,
    private _router: Router,
    private _alertService: AlertService) { }

  ngOnInit() {
    this.formGroup = this._fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  enter() {
    this._loaderService.show();
    this._loginService.login(this.formGroup.controls.login.value, this.formGroup.controls.password.value)
      .subscribe(() => {
        this._loaderService.hide();
        this._router.navigateByUrl('courses');
      },
        (val: any) => {
          this._alertService.show('Failed');
          this._loaderService.hide();
          console.log(val);
        });
  }
}
