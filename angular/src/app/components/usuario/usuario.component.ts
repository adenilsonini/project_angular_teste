import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbModal, NgbActiveModal, NgbModalOptions, NgbModalRef, ModalDismissReasons, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { faAddressCard, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  closeResult = '';
  faHandPointLeft = faPlusCircle;

  constructor(private modalService: NgbModal) { }

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

}
