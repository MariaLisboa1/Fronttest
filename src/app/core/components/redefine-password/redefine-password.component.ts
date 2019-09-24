import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/shared/messages/notification.service";
import { UsersService } from "src/app/security/login/users.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-redefine-password",
  templateUrl: "./redefine-password.component.html",
  styleUrls: ["./redefine-password.component.scss"]
})
export class RedefinePasswordComponent implements OnInit {
  redefineForm: FormGroup;
  title: string = "Salvar";

  redefine = [
    { name: "E-mail", type: "email", formName: "email" },
    { name: "password", type: "password", formName: "password" },
    { name: "confirmPassword", type: "password", formName: "confirmPassword" }
  ];

  constructor(
    private fb: FormBuilder,
    private redefineService: UsersService,
    private notifictionService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.redefineForm = this.fb.group({
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required]),
      confirmPassword: this.fb.control("", [Validators.required])
    });
  }

  onSubmit() {
    this.redefineService
      .redefinePassword(
        this.redefineForm.value.email,
        this.redefineForm.value.password,
        this.redefineForm.value.confirmPassword
      )
      .subscribe(
        res => {
          this.notifictionService.notify("Senha alterada com sucesso.");
          this.router.navigate(["/login"]);
        },
        err => {
          console.log(err);
          this.notifictionService.notify(
            "Senhas não são iguais ou email não existe."
          );
        }
      );
  }
}
