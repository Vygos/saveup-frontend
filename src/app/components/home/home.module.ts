import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerLoadingModule } from 'src/app/shared/components/spinner-loading/spinner-loading.module';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent, MenuComponent, MenuItemComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    HomeRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    SpinnerLoadingModule,
    FlexLayoutModule,
    MatCardModule
  ],
})
export class HomeModule {}
