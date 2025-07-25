import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Parameter } from '../interfaces/parameter.interface';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  http: HttpClient = inject(HttpClient);

  constructor(@Inject('') private readonly _endpoint: string) {}

  getAll<T = any>(): Observable<T[]> {
    return this.http.get<T[]>(this._endpoint);
  }

  getAllByParameters<T = any>(parameters: Parameter): Observable<T[]> {
    return this.http.get<T[]>(this._endpoint, { params: { ...parameters } });
  }

  getById<T = any>(id: string): Observable<T> {
    return this.http.get<T>(`${this._endpoint}/${id}`);
  }

  create<T = any>(data: T): Observable<T> {
    return this.http.post<T>(this._endpoint, data);
  }

  update<T = any>(id: string, data: T): Observable<T> {
    return this.http.put<T>(`${this._endpoint}/${id}`, data);
  }

  delete<T = any>(id: string): Observable<T> {
    return this.http.delete<T>(`${this._endpoint}/${id}`);
  }
}
