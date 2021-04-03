import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { FotoAtualizarService } from 'src/app/service/foto-atualizar.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  usuario: Usuario = { id: 0 };

  constructor(
    private authorizationService: AuthorizationService,
    private usuarioService: UsuarioService,
    private router: Router,
    private fotoAtualizar: FotoAtualizarService
  ) {}

  ngOnInit(): void {
    this.load();
    this.watchFotoAtualizarEvent();
  }

  watchFotoAtualizarEvent() {
    this.fotoAtualizar.fotoBase64.subscribe((fotoBase64) => {
      this.usuario.fotoBase64 = fotoBase64;
    })
  }

  load() {
    const email = this.authorizationService.getLoggedUserEmail();

    this.isLoading = true;

    this.usuarioService
      .findByEmail(email)
      .subscribe((usuario: Usuario) => (this.usuario = usuario))
      .add(() => (this.isLoading = false));
  }

  navigate(url: string) {
    this.router.navigate([url, this.usuario.id]);
  }
}
