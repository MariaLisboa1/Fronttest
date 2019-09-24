import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "./users.service";
import { Toast } from "../../shared/helpers/Toast/toast";
import toastr from "toastr";
import { NotificationService } from "src/app/shared/messages/notification.service";

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

  constructor(
    private fb: FormBuilder,
    private loginService: UsersService,
    private notifictionService: NotificationService,
    private toast: Toast
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
          this.toast.emitToastSuccess("Seja bem-vindo(a)");
        },
        err => {
          console.log(err);
          this.toast.emitToastError("Dados inválidos", "Erro");
        }
      );
  }
}
