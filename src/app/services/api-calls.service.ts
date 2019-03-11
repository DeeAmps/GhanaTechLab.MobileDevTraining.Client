import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class ApiCallsService {
  apiUrl = 'http://localhost:3000/api';
  constructor(public http: HttpClient) { }

  getNationalIDs() {
    return this.http.get(`${this.apiUrl}/nationalId/getAll`);
  }

  getInstituitions() {
    return this.http.get(`${this.apiUrl}/instituitionLevel/getAll`);
  }

  getEducationLevels() {
    return this.http.get(`${this.apiUrl}/educationalLevel/getAll`);
  }

  postApplication(data) {
    return this.http.post(`${this.apiUrl}/applicationInfo/postApplication`, { data });
  }
}
