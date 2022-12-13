import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalOptions, NgbModalRef, ModalDismissReasons, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { faAddressCard, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public UserForm: FormGroup;

  closeResult = '';
  faHandPointLeft = faPlusCircle;


  constructor(private modalService: NgbModal, private fb: FormBuilder) { this.criarForm(); }

  open(content: any) {
    this.modalService.open(content, {backdrop: 'static', keyboard: false, centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
  }

  criarForm() {
    this.UserForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required, Validators.minLength(10)],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  get form() {
    return this.UserForm.controls;
  }
  save_user() {

    alert(this.form.nome.value);

    //limpar o formulario
    this.UserForm.reset();

    //carrega valores nos campos.
    this.UserForm.patchValue(
      {
       nome:'teste',
       email: 'teste@test.com',
       password: 'dkfjek45'
      });



  }

}
