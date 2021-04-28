import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { LoginService } from 'src/app/service/login.service';
import { UsuarioService } from 'src/app/service/usuario.service';


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
    private authorization: AuthorizationService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
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
          console.log(jwt.access_token)
          this.authorization.setAccessToken(jwt.access_token);
          this.authorization.setRefreshToken(jwt.refresh_token);
          this.router.navigate(['home'])
        }, (error) => {
          if (error.status === 400) {
            this.snackBar.open('Usuario ou email inválidos', null, {duration: 3000})
          }
        })
        .add(() => (this.isLoading = false));
    }
  }

  hideShow(event) {
    if (event.pointerType === 'mouse') {
      this.hide = !this.hide
    }
  }
}
