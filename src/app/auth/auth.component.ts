import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import { AppSettings } from '../app.settings';
import { StudentService } from '../services/student/student.service';
import { Router } from '@angular/router';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  user: any = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: ''
  };

  userLoginFormGroup: any;
  userFormGroup: any;

  // controls
  isRegister = false;
  isSubmitted = false;
  isLoading = false;

  constructor(
    private auth: AuthService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private events: EventsService,
    private studentService: StudentService,
    private router: Router,
    private course: CourseService,
    private ref: ChangeDetectorRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    const loggedInUser = this.studentService.getUser();

    if (loggedInUser.access_token) {
      this.router.navigate(['/students']);
    }
  }

  ngOnInit() {
    this.events.get(AppSettings.EVENT_IS_LOGGED_IN).subscribe((data) => {
      console.log('data', data);
      this.router.navigate(['/students/list']);
      console.log('Must redirect to students list');
    });

    // initialize registration validator
    this.userFormGroup = new FormGroup(
      {
        'email': new FormControl(this.user.email,
          [
            Validators.required,
            Validators.email
          ]),
        'password': new FormControl(this.user.password,
          [
            Validators.required
          ]),
        'confirmPassword': new FormControl(this.user.confirmPassword,
          [
            Validators.required
          ]),
        'firstName': new FormControl(this.user.firstName,
          [
            Validators.required
          ]),
        'middleName': new FormControl(this.user.middleName,
          [
            Validators.required
          ]),
        'lastName': new FormControl(this.user.lastName,
          [
            Validators.required
          ]),
        'gender': new FormControl(this.user.gender,
          [
            Validators.required
          ])
      }
    );

    this.userLoginFormGroup = new FormGroup(
      {
        'userName': new FormControl(this.user.email,
          [
            Validators.required,
            Validators.email
          ]),
        'password': new FormControl(this.user.password,
          [
            Validators.required
          ]),
      }
    );

  }

  onLogin() {
    this.isSubmitted = true;

    if (this.userLoginFormGroup.valid) {
      this.isLoading = true;
      this.toastr.info('Your request is being proccessed', 'Loading');
      this.auth.login(this.userLoginFormGroup.value)
        .then((result) => {
          this.toastr.success('You have successfully login', 'Success!');
          this.isLoading = false;

        }, (error) => {
          this.toastr.error('Something went wrong, Please try again.', 'Error');
          this.isLoading = false;
        });
    }
  }

  onRegister() {
    this.isSubmitted = true;

    if (this.userFormGroup.valid && this.isPasswordsMatch()) {
      this.isLoading = true;
      this.toastr.info('Your request is being processed', 'Loading');
      this.auth.register(this.userFormGroup.value)
      .then((result) => {
        this.isLoading = false;
        this.toastr.success('Student was successfully Added', 'Success!').then(() => {
          this.switchAction();
        });
      }, (error) => {
        this.isLoading = false;
        this.toastr.error('Please try again', 'Something went wrong!').then(() => {
        });
      });
    }
  }

  switchAction() {
    this.clearUserDetails();
    this.userFormGroup.reset();
    this.isRegister = !this.isRegister;
    this.isSubmitted = false;
    this.isLoading = false;
  }

  clearUserDetails() {
    this.user = {
      email: '',
      password: '',
      confirmPassowrd: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: ''
    };
  }

  isPasswordsMatch() {
    let user = this.userFormGroup.value;

    return (user.password === user.confirmPassword);
  }
}
