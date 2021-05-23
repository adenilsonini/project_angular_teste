import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'default', component: DefaultComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: '', redirectTo: 'default', pathMatch: 'full' },
  { path: '**', redirectTo: 'default', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
