import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student/student.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { AppSettings } from './app.settings';
import { AuthService } from './services/auth/auth.service';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// plugins
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { EventsService } from './services/events/events.service';
import { StudentService } from './services/student/student.service';
import { RouteGuardService } from './services/route-guard/route-guard.service';
import { CourseService } from './services/course/course.service';
import { CourseComponent } from './course/course.component';
import { SingleStudentComponent } from './single-student/single-student.component';
import { StudentParentComponent } from './student-parent/student-parent.component';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { WebStorageModule, LocalStorageService } from 'angular-localstorage4';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StudentComponent,
    AuthComponent,
    MainComponent,
    CourseComponent,
    SingleStudentComponent,
    StudentParentComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    WebStorageModule,
    ToastModule.forRoot()
  ],
  providers: [
    EventsService,
    AuthService,
    StudentService,
    RouteGuardService,
    CourseService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
