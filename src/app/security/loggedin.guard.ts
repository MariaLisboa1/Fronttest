import {
  CanLoad,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from "@angular/router";
import { Injectable } from "@angular/core";
import { UsersService } from "./login/users.service";
import { Observable } from "rxjs";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router, private userService: UsersService) {}

  // canLoad(route: Route): boolean {
  //   const loggedIn = this.userService.isLoggedIn();
  //   console.log(loggedIn);
  //   if (!loggedIn) {
  //     this.userService.handleLogin();
  //   }
  //   return loggedIn;
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const getToken = localStorage.getItem("token");
    console.log(getToken);

    if (getToken !== null && getToken !== undefined) {
      return true;
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
