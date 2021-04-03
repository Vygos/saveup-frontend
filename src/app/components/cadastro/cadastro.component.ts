import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { LoginService } from 'src/app/service/login.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  form: FormGroup;

  hide: boolean = true;
  showCheck: boolean = false;
  isLoading: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private loginService: LoginService,
    private authorization: AuthorizationService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group(
      {
        nome: ['', [Validators.required, Validators.maxLength(255)]],
        email: new FormControl('', {
          validators: [
            Validators.required,
            Validators.maxLength(100),
            Validators.email,
          ],
          asyncValidators: this.existsByEmail(this.usuarioService),
        }),
        senha1: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(16),
          ],
        ],
        senha2: [
          '',
          [
            Validators.required,
            Validators.maxLength(16),
            this.passwordValidator,
          ],
        ],
      },
      { validators: this.passwordValidator }
    );
  }

  entrar() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.isLoading = true;
      let usuario = this.form.value as Usuario;
      usuario.secret = this.form.value.senha1;
      this.authorization
        .getToken(environment.email, environment.pswd)
        .subscribe((jwt) => {
          const headers = new HttpHeaders().append(
            'Authorization',
            `Bearer ${jwt.access_token}`
          );
          this.usuarioService
            .salvar(usuario, headers)
            .subscribe(() => {
              this.isLoading = false;
              this.showCheck = true;
            })
            .add(() => (this.isLoading = false));
        });
    }
  }

  passwordValidator(control: AbstractControl) {
    let senha1 = control.get('senha1');
    let senha2 = control.get('senha2');

    if (!(senha2 && senha2.value)) {
      return null;
    }

    if (senha1.value !== senha2.value) {
      senha2.setErrors({ notEquals: true });
    } else {
      const errors = senha2.errors;

      if (errors) {
        delete errors.notEquals;
        senha2.setErrors(errors);
      }
    }
  }

  existsByEmail(usuarioService: UsuarioService) {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      return usuarioService
        .existsByEmail(control.value)
        .pipe(map((exists) => (exists ? { emailExists: true } : null)));
    };
  }
}
