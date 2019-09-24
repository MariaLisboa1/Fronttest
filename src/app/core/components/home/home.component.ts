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

  cards = [
    {
      title: "Mussum Ipsum cacilds",
      text:
        "Delegadis gente finis, bibendum egestas augue arcu ut est interessantiss quisso pudia."
    },
    {
      title: "Mussum Ipsum cacilds",
      text:
        "Delegadis gente finis, bibendum egestas augue arcu ut est interessantiss quisso pudia."
    },
    {
      title: "Mussum Ipsum cacilds",
      text:
        "Delegadis gente finis, bibendum egestas augue arcu ut est interessantiss quisso pudia."
    }
  ];

  constructor() {}

  ngOnInit() {}
}
