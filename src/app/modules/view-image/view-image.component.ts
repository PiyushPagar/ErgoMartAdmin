import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';
import { FileUploadService } from 'src/app/_services/file-upoad.service';


@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css'],
})
export class ViewImageComponent implements OnInit {
  valueofimage: String = GlobalComponent.imageUrl + 'default.png';
  shortLink: string = '';
  loading: boolean = false; // Flag variable

  title = 'File-Upload-Save';
  selectedFiles!: FileList;
  currentFileUpload!: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  imageForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private uploadService: FileUploadService,
    private sanitizer: DomSanitizer,
    private dailogRef: MatDialogRef<ViewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.viewImage(this.editData);

    this.imageForm = this.formBuilder.group({
      category: [''],
      quantity: [''],
    });
  }

  onFileSelected(event: any) {
    console.log(event);
    if (event.target.files) {
      const file = event.target.files[0];
    }
  }

  viewImage(editData: any) {
    console.log(GlobalComponent.imageUrl + editData.imageUrl);
    if (this.editData.imageUrl == '') {
      this.valueofimage = GlobalComponent.imageUrl + 'default.png';
    } else {
      this.valueofimage = GlobalComponent.imageUrl + this.editData.imageUrl;
    }
  }


  // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
  //   const data: FormData = new FormData();
  //   data.append('file', file);
  //   const newRequest = new HttpRequest(
  //     'POST',
  //     GlobalComponent.appUrl + 'addproductImage/10',
  //     data,
  //     {
  //       reportProgress: true,
  //       responseType: 'text',
  //     }
  //   );
  //   return this.http.request(newRequest);
  // }

  change(event:any) {
    this.changeImage = true;
  }
  changedImage(event:any) {
    this.selectedFile = event.target.files[0];
  }
//   upload() {
//     this.progress.percentage = 0;
//     this.currentFileUpload = this.selectedFiles.item(0);
// this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
//       if (event.type === HttpEventType.UploadProgress) {
//         this.progress.percentage = Math.round(100 * event.loaded / event.total);
//       } else if (event instanceof HttpResponse) {
//          alert('File Successfully Uploaded');
//       }
//       this.selectedFiles = undefined;`
//      }
//     );
//   }
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }
}
