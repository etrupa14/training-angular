import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { EventsService } from '../events/events.service';
import { AppSettings } from '../../app.settings';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Promise } from 'q';
import { LocalStorageService } from 'angular-localstorage4';

@Injectable()
export class StudentService {

  private user = {
    access_token : ''
  };
  private selectedStudent: any;


  constructor(
    private events: EventsService,
    private http: Http,
    private localStorage: LocalStorageService
  ) {
  }

  initializeStudent() {
    let user = this.getUser();
    if (!user.access_token) {
        user = this.localStorage.get('user');
        // if no user in local create subscription
        if (user.access_token === '' || !user.hasOwnProperty('access_token')) {
          console.log('creating subscription');
          this.events.get(AppSettings.EVENT_IS_LOGGED_IN).subscribe((student) => {
            console.log('something happened on student service');
            const loggedInUser = '';
            if (student) {
              this.user = student.json();
            }
          });
        } else {
          this.user = user;
        }
    }
  }

  getUser() {
    return this.user;
  }

  getStudents(): Promise<any> {
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${this.user.access_token}`);
    const options = new RequestOptions({headers: headers});
    const url = AppSettings.API_STUDENTS_LIST_URL;

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

  getSelectedStudent(): Promise<any> {
    return Promise((resolve, reject) => {
      if (this.selectedStudent) {
        resolve(this.selectedStudent);
      }

      reject({});
    });
  }


  setSelectedStudent(student): Promise<any> {
    return Promise((resolve, reject) => {
      this.selectedStudent = student;

      if (this.selectedStudent) {
          resolve({});
      }

      reject({});
    });
  }

  getStudentById(id): Promise<any> {
    return Promise((resolve, reject) => {
      const headers = new Headers();
      headers.set('Authorization', `Bearer ${this.user.access_token}`);
      const options = new RequestOptions({headers: headers});
      const url = `${AppSettings.API_STUDENT_URL}${id}`;

      this.http.get(url, options)
        .toPromise()
        .then((result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }

  enrollStudent(studentId, courseId): Promise<any> {
    return Promise((resolve, reject) => {
      const headers = new Headers();
      headers.set('Authorization', `Bearer ${this.user.access_token}`);
      const options = new RequestOptions({headers: headers});
      const url = AppSettings.API_STUDENT_ENROLL_URL;

      const body = {
        studentId: studentId,
        courseId: courseId
      };

      this.http
        .post(url, body, options)
        .toPromise()
        .then( (result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }

  unEnrollStudent(studentId, courseId): Promise<any> {
    return Promise((resolve, reject) => {
      const headers = new Headers();
      headers.set('Authorization', `Bearer ${this.user.access_token}`);
      const options = new RequestOptions({headers: headers});
      const url = AppSettings.API_STUDENT_UNENROLL_URL;
      const body = {
        studentId: studentId,
        courseId: courseId
      };

      this.http
        .post(url, body, options)
        .toPromise()
        .then((result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }

  clearUser() {
    this.user = {
      'access_token': ''
    };
  }
}
