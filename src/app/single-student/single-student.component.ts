import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, NgModule } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CourseService } from '../services/course/course.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsService } from '../services/events/events.service';
import { AppSettings } from '../app.settings';

@NgModule({
  imports: [
    BrowserAnimationsModule
  ]
})
@Component({
  selector: 'app-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.scss'],
})
export class SingleStudentComponent implements OnInit {

  student: any;
  selectedStudentId: string;
  courses: any = [];
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private courseService: CourseService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef,
    private events: EventsService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loadCourses();
    this.activatedRoute.params.subscribe((params) => {
      this.selectedStudentId = params.id;

      if (this.selectedStudentId) {
        this.loadStudent(this.selectedStudentId);
      }
    });

    this.initializeListenOnStudentUpdate();
  }

  ngOnInit() {
  }

  initializeListenOnStudentUpdate() {
    this.events.get(AppSettings.EVENT_SELECTED_STUDENT_UPDATED).subscribe(() => {
      this.loadStudent(this.selectedStudentId);
    });
  }

  loadSelectedStudent() {
    this.studentService
      .getSelectedStudent()
      .then((result) => {
        this.student = result;
        console.log('result', this.student);
      }, (error) => {
        console.log('error', error);
      });
  }

  loadStudent(selectedId) {
    this.studentService
      .getStudentById(selectedId)
      .then((result) => {
        this.student = result.json();
        console.log('student', this.student);
        this.ref.detectChanges();
      }, (error) => {
        console.log('error', error);
        this.student = {};
      });
  }

  loadCourses() {
    this.courseService
      .getCourses()
      .then((result) => {
        this.courses = result.json();
        this.ref.detectChanges();
      }, (error) => {
        console.log('error', error);
        this.courses = [];
      });
  }

  enroll(courseId) {
    this.isLoading = true;
    this.ref.detectChanges();
    this.toastr.info('Please wait, your request is being proccessed', 'Loading');

    this.studentService
      .enrollStudent(this.selectedStudentId, courseId)
      .then((result) => {
        this.isLoading = false;
        this.toastr.success('Student was successfully enrolled', 'Success');
        this.events.get(AppSettings.EVENT_SELECTED_STUDENT_UPDATED).emit(true);
        console.log('result', result);
      }, (error) => {
        this.isLoading = false;
        this.toastr.error('Please try again, Something went wrong', 'Error');
        console.log('error', error);
      });
  }

  unEnroll(courseId) {
    this.isLoading = true;
    this.ref.detectChanges();
    this.toastr.info('Please wait, your request is being proccessed', 'Loading');

    this.studentService
      .unEnrollStudent(this.selectedStudentId, courseId)
      .then((result) => {
        console.log('unenroll result', result);
        this.isLoading = false;
        this.toastr.success('Student was successfully unenrolled', 'Success');
        this.events.get(AppSettings.EVENT_SELECTED_STUDENT_UPDATED).emit(true);

      }, (error) => {
        this.isLoading = false;
        this.toastr.error('Please try again, Something went wrong', 'Error');
        console.log('error', error);
      });
  }

}
