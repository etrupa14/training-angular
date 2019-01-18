import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student/student.component';
import { AuthComponent } from './auth/auth.component';
import { RouteGuardService } from './services/route-guard/route-guard.service';
import { CourseComponent } from './course/course.component';
import { SingleStudentComponent } from './single-student/single-student.component';
import { StudentParentComponent } from './student-parent/student-parent.component';

const routes: Routes = [
  { path: '', redirectTo: 'students/list', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuardService]},
  { path: 'students', component: StudentParentComponent, canActivate: [RouteGuardService],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: StudentComponent, canActivate: [RouteGuardService] },
      { path: 'view/:id', component: SingleStudentComponent, canActivate: [RouteGuardService] }
    ]
  },
  { path: 'courses', component: CourseComponent, canActivate: [RouteGuardService]},
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
