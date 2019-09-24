import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "src/app/security/login/users.service";

import { GenericValidator } from "src/app/shared/helpers/validateCpf/validateCpf";
import { Toast } from "src/app/shared/helpers/Toast/toast";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  title: string = "Cadastrar";
  viewPassword: boolean = false;
  // endereco = ["CEP", "Logradouro", "Numero", "Bairro"];

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: UsersService,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nameSocialReason: this.fb.control("", [Validators.required]),
      cpf: this.fb.control(
        { value: null, disabled: false },
        GenericValidator.isValidCpf()
      ),
      phone: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required]),
      cep: this.fb.control("", [Validators.required]),
      publicPlace: this.fb.control("", [Validators.required]),
      num: this.fb.control("", [Validators.required]),
      neighborhood: this.fb.control("", [Validators.required])
    });
  }

  validateCep(validate) {
    console.log("hi");

    const getValidate = this.registerForm.get("cpf").getError("cpfNotValid");
    console.log(getValidate);

    if (getValidate) {
      this.toast.emitToastError("Digite um CPF válido.", "Erro");
    }
  }

  getPassword() {
    const getId = <HTMLInputElement>document.getElementById("password");

    getId.type = getId.type == "password" ? "text" : "password";
    this.viewPassword = getId.type == "password" ? false : true;
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
          console.log(res);
        },
        err => {
          this.toast.emitToastError(
            "Ocorreu um erro, por favor tente mais tarde.",
            "Erro"
          );
          console.log(err);
        }
      );
  }
}
