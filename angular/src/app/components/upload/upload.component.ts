import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{
  salvar: boolean = false;
  images : string[] = [];
  myFiles: File [] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  public Uploadform: FormGroup;
  progress: number = 0;

  constructor(public fb: FormBuilder, public fileUploadService: FileUploadService){ this.criarForm(); }

  get myForm(){
    return this.Uploadform.controls;
  }

  criarForm() {
    this.Uploadform = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  excluir_img(url: any) {
    const index: number = this.images.indexOf(url);
       if (index !== -1) {
           this.images.splice(index, 1);
           this.myFiles.splice(index, 1);
       }
    }

  novo(){
      this.images = [];
      this.myFiles = [];
      this.progressInfos = [];
      this.message = [];
      this.Uploadform.reset();
      this.salvar = false;
  }

  selectFiles(event : any): void {
    this.message = [];
    this.progressInfos = [];

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();

              reader.onload = (event:any) => {
                 this.images.push(event.target.result);
              }

              reader.readAsDataURL(event.target.files[i]);

              this.myFiles.push(event.target.files[i]);
      }
   }
 }

  uploadFiles(): void {
    this.message = [];

    if (this.myFiles) {
      for (var i = 0; i < this.myFiles.length; i++) {
        this.upload(i, this.myFiles[i]);
      }
    }
  }


  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {

      this.fileUploadService.addUser(
        this.myForm.name.value,
        file
      ).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          }
          if (event.type === HttpEventType.Response) {
            const msg = event.body + ", Imagem recebida: " + file.name;
            this.message.push(msg);
            this.salvar = true;
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Ocorreu uma falha ao enviar a Imagem: ' + file.name;
          this.message.push(msg);
        });
    }

  }

}
