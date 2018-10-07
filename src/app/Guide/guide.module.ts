import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';

import { AngularUniversalComponent } from './components/angular-universal/angular-universal.component';
import { JwtAuthComponent } from './components/jwt-auth/jwt-auth.component';


const routes: Routes = [
  { path: 'angular-universal-setup', component: AngularUniversalComponent},
  { path: 'authentication-with-jwt', component: JwtAuthComponent}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    AngularUniversalComponent,
    JwtAuthComponent
  ]
})
export class GuideModule { }
