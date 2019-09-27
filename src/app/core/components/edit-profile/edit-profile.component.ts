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
  imageSrc;
  selectFile: File = null;
  constructor(
    private fb: FormBuilder,
    private editProfileService: UsersService,
    private toast: Toast,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.editProfileService.user;

    this.editProfileForm = this.fb.group({
      name: this.fb.control(""),
      email: this.fb.control(this.user.user.email),
      oldPassword: this.fb.control("", [Validators.required]),
      newPassword: this.fb.control("", [Validators.required])
    });
  }

  changePhoto(event) {
    this.selectFile = <File>event.target.files[0];

    if (<File>event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = e => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }

    const photo = new FormData();

    if (this.selectFile) {
      Object.defineProperty(this.selectFile, "name", {
        writable: true,
        value: this.user.user.id + ".png"
      });

      photo.append("photo", this.selectFile, this.selectFile.name);

      this.editProfileService.sendPhoto(photo, this.user.user.id).subscribe(
        res => {
          console.log(res);
        },
        err => {
          this.toast.emitToastError(
            "Ocorreu um erro. Por favor tente mais tarde.",
            "Erro"
          );
        }
      );
    }
  }

  onSubmit() {
    const name = this.editProfileForm.value.name;
    const oldPassword = this.editProfileForm.value.oldPassword;
    const newPassword = this.editProfileForm.value.newPassword;
    const email = this.editProfileForm.value.email;

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
