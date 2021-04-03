import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ObjectDTO } from 'src/app/models/objectdto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FotoAtualizarService } from 'src/app/service/foto-atualizar.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { CPF } from 'src/app/shared/components/masks/masks';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss'],
})
export class ContaComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean = false;
  usuario: Usuario;
  isLoading: boolean = false;
  cpfMask = CPF;
  showFotoInput;

  constructor(
    private _fb: FormBuilder,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private matSnack: MatSnackBar,
    private fotoAtualizar: FotoAtualizarService
  ) {}

  get foto() {
    return this.form.get('foto');
  }

  get nome() {
    return this.form.get('nome');
  }

  get email() {
    return this.form.get('email');
  }

  get cpf() {
    return this.form.get('cpf');
  }

  get vlRenda() {
    return this.form.get('vlRenda');
  }

  get dtNascimento() {
    return this.form.get('dtNascimento');
  }

  get dtCadastro() {
    return this.form.get('dtCadastro');
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.initForm(new Usuario());

    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'] as number;

      this.usuarioService.findById(id).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
        this.initForm(usuario);
        this.isLoading = false;
      });
    });
    this.usuarioService;
  }

  initForm(usuario?: Usuario) {
    this.form = this._fb.group({
      id: [usuario.id ? usuario.id : null],
      foto: [usuario.foto ? usuario.foto : null],
      nome: [
        { value: usuario.nome ? usuario.nome : null, disabled: true },
        [Validators.required, Validators.maxLength(255)],
      ],
      email: new FormControl(
        {
          value: usuario.email ? usuario.email : null,
          disabled: true,
        },
        [Validators.required, Validators.email, Validators.maxLength(255)]
      ),
      cpf: [{ value: usuario.cpf ? usuario.cpf : null, disabled: true }, [Validators.required]],
      dtCadastro: [
        {
          value: usuario.dtCadastro ? usuario.dtCadastro : null,
          disabled: true,
        },
      ],
      dtNascimento: [
        {
          value: usuario.dtNascimento ? usuario.dtNascimento : null,
          disabled: true,
        },
        [Validators.required],
      ],
      vlRenda: [
        { value: usuario.vlRenda ? usuario.vlRenda : null, disabled: true },
        [Validators.required]
      ],
    });
  }

  editar() {
    this.isEdit = true;

    this.nome.enable();
    this.cpf.enable();
    this.vlRenda.enable();
    this.dtNascimento.enable();
    this.showFotoInput = true;
  }

  cancelar() {
    this.isEdit = false;
    this.disabledFields();
    this.initForm(this.usuario);
  }

  disabledFields() {
    this.nome.disable();
    this.cpf.disable();
    this.vlRenda.disable();
    this.dtNascimento.disable();
    this.foto.disable();
    this.showFotoInput = false;
  }

  salvar() {
    this.form.markAllAsTouched();

    console.log('form', this.form.value);

    if (this.form.valid) {
      this.isLoading = true;
      if (this.form.value.foto) {
        const fotoBlob = this.form.value.foto;
        let usuario = this.form.value as Usuario;

        this.usuarioService
          .upload(this.usuario.id, fotoBlob)
          .subscribe((foto: ObjectDTO) => {
            usuario.foto = foto.object;

            this.usuarioService
              .atualizar(usuario.id, usuario)
              .subscribe(() => {

                this.isLoading = false;
                this.isEdit = false;
                this.disabledFields();

                this.matSnack.open('Dados atualizados com sucesso', null, {
                  duration: 2000,
                });


                this.atualizarFotoHome(fotoBlob);

              })
              .add(() => (this.isLoading = false));
          });
      } else {
        this.usuarioService
          .atualizar(this.usuario.id, this.usuario)
          .subscribe(() => {
            this.isLoading = false;
            this.matSnack.open('Dados atualizados com sucesso', null, {
              duration: 2000,
            });
          });
      }
    }
  }

  async atualizarFotoHome(file: File) {
    const base64 = await this.toBase64(file) as string;

    const base64WihoutBegin = base64.split(',')[1];

    this.fotoAtualizar.fotoBase64.next(base64WihoutBegin);
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
