import {
  Component,
  OnInit,
  ContentChild,
  AfterContentInit,
  Input
} from "@angular/core";
import { FormControlName } from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html"
})
export class InputComponent implements OnInit, AfterContentInit {
  @Input() errorMessage: string;

  input: any;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.input = this.control;
    if (this.input === undefined) {
      throw new Error(
        "Esse componente precisa ser usado com uma diretiva ngModel ou formControlName"
      );
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }
}
