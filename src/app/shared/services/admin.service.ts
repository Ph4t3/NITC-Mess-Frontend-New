import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AssignMess } from '../models/service-request/admin-request.model';
import { Student } from '../models/service-response/admin-response.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiEndpoint = environment.apiEndpoint;

  constructor(public http: HttpClient) {}

  public getUsersWithoutMess() {
    return this.http.get<Student[]>(
      `${this.apiEndpoint}/api/admin/list-people-without-mess`
    );
  }

  public assignMess(data: AssignMess) {
    console.log(data);
    return this.http.post(`${this.apiEndpoint}/api/admin/assign-mess`, data);
  }
}
