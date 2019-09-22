import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  title: string = "Saiba mais";
  bgFront = "../../../../assets/images/bg-front.png";
  fingerprint = "../../../../assets/images/fingerprint.png";
  frontTest = "../../../../assets/images/front-test.png";

  constructor() {}

  ngOnInit() {}
}
