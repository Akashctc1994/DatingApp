import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()

export class MemberEditResolver implements Resolve<User>{
    constructor(private userService: UserService, private authService: AuthService,
        // tslint:disable-next-line: align
        private router: Router, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('problem retriving your data');
                this.router.navigate(['/member']);
                return of(null);
            })
        );
    }
}