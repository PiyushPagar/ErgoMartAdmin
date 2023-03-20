import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

//   // API url
//   baseApiUrl = "https://file.io"

//   constructor(private http:HttpClient) { }

//   // Returns an observable
//   upload(file: any):Observable<any> {

//       // Create form data
//       const formData = new FormData();

//       // Store form name as "file" with file data
//       formData.append("file", file, file.name);

//       // Make http post request over api
//       // with formData as req
//       return this.http.post(this.baseApiUrl, formData)
//   }
// }

constructor(private https: HttpClient) { }
pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
  const data: FormData = new FormData();
  data.append('file', file);
  const newRequest = new HttpRequest('POST', 'http://localhost:8080/savefile', data, {
  reportProgress: true,
  responseType: 'text'
  });
  return this.https.request(newRequest);
}
}
