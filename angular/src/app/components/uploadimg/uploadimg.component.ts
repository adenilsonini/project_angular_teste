import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-uploadimg',
  templateUrl: './uploadimg.component.html',
  styleUrls: ['./uploadimg.component.css']
})
export class UploadimgComponent{
   images : string[] = [];
   myForm = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
   file: new FormControl('', [Validators.required])
 });

 constructor(private http: HttpClient) { }

 get f(){
   return this.myForm.controls;
 }


 excluir_img(url: any) {
 const index: number = this.images.indexOf(url);
    if (index !== -1) {
        this.images.splice(index, 1);

        this.myForm.patchValue({
          fileSource: this.images
       });
    }
 }



 onFileChange(event: any) {
   if (event.target.files && event.target.files[0]) {
       var filesAmount = event.target.files.length;

       for (let i = 0; i < filesAmount; i++) {
               var reader = new FileReader();

               reader.onload = (event:any) => {
              //   console.log(event.target.result);
                  this.images.push(event.target.result);

                  this.myForm.patchValue({
                     fileSource: this.images
                  });
               }

               reader.readAsDataURL(event.target.files[i]);
       }
   }
 }

 submit(){

  var formData: any = new FormData();
 // formData.append("name", this.myForm.controls.name.value);
  formData.append("files", this.f.fileSource);
  //alert(this.myForm.controls.fileSource.value);

  console.log(formData);

   this.http.post('http://localhost:5000/api/v1/Upload/img', formData, {responseType: 'text'})
     .subscribe(res => {
       console.log(res);
       alert('Uploaded Successfully.');
     }, error => {
      console.log(error);
    })
 }

}
