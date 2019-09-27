import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Toast } from "src/app/shared/helpers/Toast/toast";
import { UsersService } from "src/app/security/login/users.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  title: string = "Salvar";
  editProfileForm: FormGroup;
  email;
  user;
  constructor(
    private fb: FormBuilder,
    private editProfileService: UsersService,
    private toast: Toast,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = this.editProfileService.user.email;
    this.editProfileForm = this.fb.group({
      name: this.fb.control(""),
      oldPassword: this.fb.control("", [Validators.required]),
      newPassword: this.fb.control("", [Validators.required])
    });
  }

  onSubmit() {
    this.user = this.editProfileService.user;
    const name = this.editProfileForm.value.name;
    const oldPassword = this.editProfileForm.value.name;
    const newPassword = this.editProfileForm.value.name;
    const email = this.email;

    this.editProfileService
      .editProfile({ email, oldPassword, newPassword, name })
      .subscribe(
        res => {
          this.toast.emitToastSuccess("Dados alterados com sucesso.");
          this.router.navigate(["/login"]);
        },
        err =>
          this.toast.emitToastError(
            "Por favor digite a senha atual correta.",
            "Error"
          )
      );
  }
}
