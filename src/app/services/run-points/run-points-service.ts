import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RunPoint } from '../../models/RunPoint';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RunPointsService {
  constructor(private httpClient: HttpClient){

  }

  getRunPointsByRunId(runId: number) : Observable<RunPoint[]>{
    return this.httpClient.get<RunPoint[]>(environment.apiUrl + 
      `/runPoints?runId=${runId}`
    )
  }
}
