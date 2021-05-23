import { LoginserviceService } from '../../services/loginservice.service';
import { Component, OnInit } from '@angular/core';
import { faUserLock, faUnlockAlt} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ico_password = faUserLock;
  ico_lock = faUnlockAlt;

  usuario = {Username:'', Password:''}



  constructor(private Loginservice: LoginserviceService){}

  public login() {
    this.Loginservice.login(this.usuario)
  }


  ngOnInit() {
  }

}
