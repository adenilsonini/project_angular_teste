import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbModal, NgbActiveModal, NgbModalOptions, NgbModalRef, ModalDismissReasons, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { faAddressCard, faPlusCircle} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [NgbCarouselConfig],
})
export class DefaultComponent implements OnInit {
  closeResult = '';
  faHandPointLeft = faPlusCircle;

  public images: Array<any> = [
    {
      p: "testo de imagens",
      name: `Name da imagem 02`,
      url: `http://nfesjp.online`,
      src: `assets/images/1.jpg`
    },
    {
      p: "testo de imagens ade ",
      name: `Name da imagem 03`,
      url: `https:google.com`,
      src: `assets/images/2.jpg`
    }
  ]

  @ViewChild('carousel') carousel: any;

  constructor(config: NgbCarouselConfig, private modalService: NgbModal) {
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows=true;
    config.showNavigationIndicators=true
    config.wrap=true
  }


  pause() {
    this.carousel.pause();
  }

  ngOnInit() {
  }

}
