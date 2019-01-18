import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { StudentService } from '../student/student.service';
import { AppSettings } from '../../app.settings';
import { Promise } from 'q';

@Injectable()
export class CourseService {

  constructor(
    private http: Http,
    private studentService: StudentService
  ) {}

  getCourses(): Promise<any> {
    const url  = AppSettings.API_COURSES_LIST_URL;
    const headers = new Headers();
    const user = this.studentService.getUser();
    const token = user.access_token;
    headers.set('Authorization', `Bearer ${token}`);
    const options = new RequestOptions({headers: headers});

    return Promise((resolve, reject) => {
      this.http
        .get(url, options)
        .toPromise()
        .then((result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }

}
