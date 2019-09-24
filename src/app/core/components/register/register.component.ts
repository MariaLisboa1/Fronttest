import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "src/app/security/login/users.service";
import { NotificationService } from "src/app/shared/messages/notification.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  title: string = "Cadastrar";
  // endereco = ["CEP", "Logradouro", "Numero", "Bairro"];

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: UsersService,
    private notifictionService: NotificationService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nameSocialReason: this.fb.control("", [Validators.required]),
      cpf: this.fb.control("", [Validators.required]),
      phone: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required]),
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
          this.notifictionService.notify("Conta criada com sucesso.");
          console.log(res);
        },
        err => {
          this.notifictionService.notify(
            "Ocorreu um erro, por favor tente mais tarde."
          );
          console.log(err);
        }
      );
  }
}
