import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "src/app/security/login/users.service";

import { GenericValidator } from "src/app/shared/helpers/validateCpf/validateCpf";
import { Toast } from "src/app/shared/helpers/Toast/toast";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  title: string = "Cadastrar";

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: UsersService,
    private toast: Toast,
    private route: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nameSocialReason: this.fb.control("", [Validators.required]),
      cpf: this.fb.control({ value: null, disabled: false }, [
        Validators.required,
        GenericValidator.isValidCpf()
      ]),
      phone: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(5)
      ]),
      cep: this.fb.control("", [Validators.required]),
      publicPlace: this.fb.control("", [Validators.required]),
      num: this.fb.control("", [Validators.required]),
      neighborhood: this.fb.control("", [Validators.required])
    });
  }

  onSubmit() {
    this.registerService
      .register(
        this.registerForm.value.nameSocialReason,
        this.registerForm.value.cpf,
        this.registerForm.value.phone,
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.cep,
        this.registerForm.value.publicPlace,
        this.registerForm.value.num,
        this.registerForm.value.neighborhood
      )
      .subscribe(
        res => {
          this.toast.emitToastSuccess("Conta criada com sucesso.");
          this.route.navigate(["/login"]);
        },
        err => {
          const error = err.error.error;
          const messageErro =
            error === "User already exists."
              ? "Usuário já existe."
              : "Ocorreu um erro, por favor tente mais tarde";
          this.toast.emitToastError(messageErro, "Erro");
          console.log(err);
        }
      );
  }
}
