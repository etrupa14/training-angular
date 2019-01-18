import { Injectable } from '@angular/core';
import { Promise } from 'q';
import { AppSettings } from '../../app.settings';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { EventsService } from '../events/events.service';
import { LocalStorage, SessionStorage, LocalStorageService } from 'angular-localstorage4';
import { StudentService } from '../student/student.service';

@Injectable()
export class AuthService {

  options: RequestOptions;

  constructor(
    private http: Http,
    private events: EventsService,
    private localStorage: LocalStorageService,
    private studentService: StudentService
  ) {
  }

  register(user): Promise<any> {
    return Promise((resolve, reject) => {
      const body = user;

      this.http
        .post(AppSettings.API_REGISTER_URL, body)
        .toPromise()
        .then((result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });

  }

  login(user): Promise<any> {
    return Promise((resolve, reject) => {

        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({ headers: headers});

        const body = new URLSearchParams();
        Object.keys(user).forEach( key => {
          body.set(key, user[key]);
        });
        body.set('grant_type', 'password');

        this.http.post(AppSettings.API_LOGIN_URL, body.toString(), options)
          .toPromise()
          .then((result) => {
            this.events.get(AppSettings.EVENT_IS_LOGGED_IN).emit(result);
            this.localStorage.set('user', result.json());
            resolve(result);
          }, (error) => {
            reject(error);
          });
    });
  }

  logout(): Promise <any> {
    return Promise((resolve, reject) => {
      this.localStorage.set('user', {});
      this.events.get(AppSettings.EVENT_IS_LOGGED_OUT).emit(true);
      this.studentService.clearUser();
      resolve(true);
    });
  }
}
