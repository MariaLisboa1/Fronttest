import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const getToken = localStorage.getItem("token");
    console.log(getToken);

    if (getToken != null && getToken != undefined) {
      return true;
    } else {
      console.log("ok");

      this.router.navigate(["/login"]);
    }
  }
}
