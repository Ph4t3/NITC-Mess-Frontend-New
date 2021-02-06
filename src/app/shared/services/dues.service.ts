import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ListDue,
  DueAdd,
  MessCut,
} from '../models/service-request/dues-request.model';
import {
  Due,
  DueStudent,
} from '../models/service-response/dues-response.model';

@Injectable({
  providedIn: 'root',
})
export class DueService {
  private apiEndpoint = environment.apiEndpoint;

  constructor(public http: HttpClient) {}

  public studentList() {
    return this.http.get<DueStudent[]>(`${this.apiEndpoint}/api/dues/list`);
  }

  public add(data: DueAdd) {
    return this.http.post(`${this.apiEndpoint}/api/dues/add`, data);
  }

  public messCut(data: MessCut) {
    return this.http.post(`${this.apiEndpoint}/api/dues/messcut`, data);
  }

  public getDues(data: ListDue) {
    return this.http.post<Due[]>(
      `${this.apiEndpoint}/api/admin/student/dues`,
      data
    );
  }
}
