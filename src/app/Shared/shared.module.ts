import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ShareModule } from '@ngx-share/core';

import { HeroNavbarComponent } from './components/hero-navbar/hero-navbar.component';
import { BooksBackComponent } from './components/books-back/books-back.component';

import { SeoService } from './services/seo.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ShareModule.forRoot(),
  ],
  declarations: [
    HeroNavbarComponent,
    BooksBackComponent
  ],
  exports: [
    HeroNavbarComponent,
    BooksBackComponent
  ],
  providers: [
    AuthGuard,
    SeoService
  ]
})
export class SharedModule { }
