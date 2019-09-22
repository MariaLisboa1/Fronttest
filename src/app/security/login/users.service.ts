import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "./user.model";
import { tap } from "rxjs/operators";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => (this.lastUrl = e.url));
  }

  user: User;
  lastUrl: string;

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(["/login"]);
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.urlApi}/session`, {
        email,
        password
      })
      .pipe(tap(user => (this.user = user)));
  }

  logout() {
    this.user = undefined;
    this.router.navigate(["/login"]);
  }
}
