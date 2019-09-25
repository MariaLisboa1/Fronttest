import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/security/login/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {
  constructor(private usersService: UsersService, private route: Router) {}
  edit: boolean;

  ngOnInit() {
    this.checkUrl();
  }

  isLoggedIn(): boolean {
    return this.usersService.isLoggedIn();
  }

  logout() {
    this.usersService.logout();
  }

  editProfile() {
    this.route.navigate(["/EditProfile"]);
  }

  checkUrl() {
    this.edit = this.usersService.currentUrl === "/EditProfile" ? false : true;
  }
}
