import { Component, OnInit } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { StudentService } from '../services/student/student.service';
import { EventsService } from '../services/events/events.service';
import { AppSettings } from '../app.settings';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  isLoggedIn = false;
  constructor(
    private studentService: StudentService,
    private events: EventsService,
    private router: Router,
    private auth: AuthService
  ) {
    this.studentService.initializeStudent();
    const user = this.studentService.getUser();

    if (user.access_token !== '' && user.hasOwnProperty('access_token')) {
      this.isLoggedIn = true;
    }

    console.log('user', user);
    console.log('hasproperty', user.hasOwnProperty('access_token'));
    console.log('isLoggedin', this.isLoggedIn);
  }

  ngOnInit() {
    this.events.get(AppSettings.EVENT_IS_LOGGED_OUT).subscribe((data) => {
      this.isLoggedIn = false;
      this.router.navigate(['/auth']);
      console.log('isLoggedIN', this.isLoggedIn);
    });

    this.events.get(AppSettings.EVENT_IS_LOGGED_IN).subscribe((data) => {
      this.isLoggedIn = true;
    });
  }

  logout() {
    this.auth
      .logout()
      .then(() => {
       console.log('logout success');
      }, () => {
        console.log('logout error');
      });
  }

}
