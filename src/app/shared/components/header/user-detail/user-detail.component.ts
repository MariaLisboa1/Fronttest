import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/security/login/users.service";
import { User } from "../../../../security/login/user.model";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  isLoggedIn(): boolean {
    return this.usersService.isLoggedIn();
  }

  logout() {
    this.usersService.logout();
  }
}
