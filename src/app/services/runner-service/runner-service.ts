import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Runner } from '../../models/Runner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RunnerService {
  constructor(
    private httpClient: HttpClient
  ){}

  getAll(): Observable<Runner[]>{
    return this.httpClient.get<Runner[]>(environment.apiUrl + '/runners');
  }
}
