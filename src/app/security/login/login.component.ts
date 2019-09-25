import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "./users.service";
import { Toast } from "../../shared/helpers/Toast/toast";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  title: string = "Entrar";
  show: boolean = false;
  errorLogin: boolean = false;
  // error;
  constructor(
    private fb: FormBuilder,
    private loginService: UsersService,
    private toast: Toast,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required])
    });
  }

  onSubmit() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        res => {
          console.log(res);
          this.toast.emitToastSuccess("Seja bem-vindo(a)");
          // this.router.navigate(["/home"]);
        },
        err => {
          // this.error = true;
          this.toast.emitToastError("Dados inválidos", "Erro");
        }
      );
  }
}
