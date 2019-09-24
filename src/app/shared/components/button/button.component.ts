import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
  @Input() title;
  @Output() button = new EventEmitter();
  @Input() disabled;
  constructor() {}

  ngOnInit() {
    console.log(this.disabled);
  }
}
