import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "./user.model";
import { tap } from "rxjs/operators";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => (this.lastUrl = e.url));

    this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe((e: NavigationEnd) => (this.currentUrl = e.url));
  }

  user: User;
  lastUrl: string;
  currentUrl: string;

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(["/login"]);
  }

  login(email: string, password: string): Observable<User> {
    console.log(email, password);

    return this.http
      .post<User>(`${environment.urlApi}/session`, {
        email,
        password
      })
      .pipe(tap(user => (this.user = user)));
  }

  logout() {
    localStorage.clear();
    this.user = undefined;
    this.router.navigate(["/login"]);
  }

  register(
    nameSocialReason,
    cpf,
    phone,
    email,
    password,
    cep,
    publicplace,
    num,
    neighborhood
  ) {
    return this.http.post(`${environment.urlApi}/register`, {
      nameSocialReason,
      cpf,
      phone,
      email,
      password,
      cep,
      publicplace,
      num,
      neighborhood
    });
  }

  redefinePassword(email, password, confirmPassword) {
    return this.http.put(`${environment.urlApi}/redefinePassword`, {
      email,
      password,
      confirmPassword
    });
  }

  editProfile({ email, oldPassword, newPassword, name }) {
    return this.http.put(`${environment.urlApi}/editProfile`, {
      email,
      oldPassword,
      newPassword,
      name
    });
  }

  sendPhoto(photo, id) {
    return this.http.put(`${environment.urlApi}/upload/${id}`, photo);
  }
}
