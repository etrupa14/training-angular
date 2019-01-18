import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { StudentService } from '../student/student.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(
    public studentService: StudentService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    let user_token = this.studentService.getUser();
    user_token = user_token.access_token;

    if (!user_token) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }

}
