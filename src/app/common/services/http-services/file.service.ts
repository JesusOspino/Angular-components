import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly http = inject(HttpClient);

  uploadFile(fileData: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', fileData);

    return this.http.post(`http://localhost:3000/upload`, formData);
  }
}
