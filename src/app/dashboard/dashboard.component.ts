import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
