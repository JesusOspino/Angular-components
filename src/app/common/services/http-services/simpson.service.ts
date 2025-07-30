import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Parameter } from '@interfaces/parameter.interface';
import { SimpsonRequest } from '@interfaces/simpson.interface';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimpsonService {
  private readonly url = environment.URL_SIMPSONS;
  private readonly http = inject(HttpClient);

  getSimpsons(parameters: Parameter): Observable<SimpsonRequest> {
    return this.http
      .get<SimpsonRequest>(
        `${this.url}?limit=${parameters.pageSize}&page=${parameters.pageNumber}`
      )
      .pipe(delay(500));
  }

  getSimpsonById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
}
