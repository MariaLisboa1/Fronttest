import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/security/login/users.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Toast } from "src/app/shared/helpers/Toast/toast";

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
    { name: "Senha nova", type: "password", formName: "password" },
    {
      name: "Confirme a nova senha",
      type: "password",
      formName: "confirmPassword"
    }
  ];

  constructor(
    private fb: FormBuilder,
    private redefineService: UsersService,
    private toast: Toast,
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
          this.toast.emitToastSuccess("Senha alterada com sucesso.");
          this.router.navigate(["/login"]);
        },
        err => {
          console.log(err);
          this.toast.emitToastError(
            "Senhas não são iguais ou email não existe.",
            "Erro"
          );
        }
      );
  }
}
