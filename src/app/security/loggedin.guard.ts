import { CanLoad, Route } from "@angular/router";
import { Injectable } from "@angular/core";
import { UsersService } from "./login/users.service";

@Injectable()
export class LoggedInGuard implements CanLoad {
  constructor(private userService: UsersService) {}

  canLoad(route: Route): boolean {
    const loggedIn = this.userService.isLoggedIn();
    console.log(loggedIn);
    if (!loggedIn) {
      this.userService.handleLogin();
    }
    return loggedIn;
  }
}
