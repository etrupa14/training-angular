import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  students: any;
  selectedStudent: any;
  filter =  {
    gender: false
  };

  constructor(
    private studentService: StudentService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {
    this.students = [];
  }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService
      .getStudents()
      .then((result) => {
        this.students = result.json();
        this.ref.detectChanges();
      }, (error) => {
        this.students = [];
      });
  }

  viewStudent(student) {
    this.studentService
      .setSelectedStudent(student).then( () => {
        this.router.navigate([`students/view/${student.id}`]);
      }, () => {
        console.log('error');
      });
  }

  shouldShow(student) {
    if (this.filter.gender !== false) {
      return (student.gender === this.filter.gender);
    }

    return true;
  }

}
