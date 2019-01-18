import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courses: any = [];

  constructor(
    private courseService: CourseService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService
      .getCourses()
      .then((result) => {
        this.courses = result.json();
        console.log('courses', this.courses);
        this.ref.detectChanges();
      }, (error) => {
        this.courses = [];
      });
  }
}
