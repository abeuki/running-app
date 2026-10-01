import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Run } from '../../models/Run';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RunsService {
  constructor(
    private httpClient: HttpClient
  ){

  }

  getAll(): Observable<Run[]>{
    return this.httpClient.get<Run[]>(environment.apiUrl + '/runs');
  }
}
