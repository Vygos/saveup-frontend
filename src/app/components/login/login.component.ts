import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  hide: boolean = true;

  isLoading: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private loginService: LoginService,
    private authorization: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.maxLength(100)]],
      senha: ['', [Validators.required, Validators.maxLength(16)]],
    });
  }

  entrar() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.isLoading = true;
      this.loginService
        .entrar(this.form.value)
        .subscribe((jwt) => {
          this.authorization.setAccessToken(jwt.access_token);
          this.authorization.setRefreshToken(jwt.refresh_token);
        })
        .add(() => (this.isLoading = false));
    }
  }
}
