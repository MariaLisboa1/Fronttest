import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-view-password",
  templateUrl: "./view-password.component.html",
  styleUrls: ["./view-password.component.scss"]
})
export class ViewPasswordComponent implements OnInit {
  viewPassword: boolean = false;

  constructor() {}

  ngOnInit() {}

  getPassword() {
    const getId = <HTMLInputElement>document.getElementById("password");

    getId.type = getId.type == "password" ? "text" : "password";
    this.viewPassword = getId.type == "password" ? false : true;
  }
}
