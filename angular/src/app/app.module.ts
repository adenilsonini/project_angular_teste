import { UsuarioComponent } from './components/usuario/usuario.component';
import { DefaultComponent } from './components/default/default.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UploadimgComponent } from './components/uploadimg/uploadimg.component'
import { UploadComponent } from './components/upload/upload.component'



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    UploadimgComponent,
    UsuarioComponent,
    UploadComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
