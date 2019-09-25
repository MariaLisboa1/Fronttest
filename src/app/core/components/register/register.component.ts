import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "src/app/security/login/users.service";

import { GenericValidator } from "src/app/shared/helpers/validateCpf/validateCpf";
import { Toast } from "src/app/shared/helpers/Toast/toast";
import { Router } from "@angular/router";
import { Cloudinary } from "@cloudinary/angular-5.x";

import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from "ng2-file-upload/ng2-file-upload";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  title: string = "Cadastrar";

  registerForm: FormGroup;

  personSrc = "../../../../assets/images/person.png";
  imageSrc;

  progress;
  progressTrue = false;
  responses: Array<any>;
  public uploader: FileUploader;
  constructor(
    private cloudinary: Cloudinary,
    private fb: FormBuilder,
    private zone: NgZone,
    private registerService: UsersService,
    private toast: Toast,
    private route: Router
  ) {
    this.responses = [];
  }

  ngOnInit() {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${
        this.cloudinary.config().cloud_name
      }/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,

      // XHR request headers
      headers: [
        {
          name: "X-Requested-With",
          value: "XMLHttpRequest"
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append("upload_preset", this.cloudinary.config().upload_preset);

      // Add built-in and custom tags for displaying the uploaded photo in the list
      let tags = "myphotoalbum";

      form.append("context", `photo=TESTE`);
      tags = `myphotoalbum,TESTE`;

      form.append("folder", "angular_sample");
      // Add custom tags
      form.append("tags", tags);
      // Add file to upload
      form.append("file", fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    const upsertResponse = fileItem => {
      this.zone.run(() => {
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(
            this.responses[existingId],
            fileItem
          );
        } else {
          // Create new response
          Object.defineProperty(fileItem.rawFile, "name", {
            writable: true,
            value: "this.registerForm.value.cpf" + ".png"
          });
          this.responses.push(fileItem);
          console.log(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) =>
      upsertResponse({
        file: item.file,
        filename: true,
        status,
        data: JSON.parse(response)
      });

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      upsertResponse({
        file: fileItem.file,
        progress,
        data: {}
      });
      // console.log(this.uploader.progress + '%'); //progresso

      this.progress = this.uploader.progress;

      this.progress === 100
        ? (this.progressTrue = false)
        : (this.progressTrue = true);
    };

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

  updateTitle(value: string) {
    this.title = value;
  }

  readURL(event) {
    // this.selectFile = <File>event.target.files[0];

    if (<File>event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = e => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }

    const CUR_PHOTO = new FormData();

    // if (this.selectFile) {
    //   Object.defineProperty(this.selectFile, "name", {
    //     writable: true,
    //     value: this.registerForm.value.cpf + ".png"
    //   });

    //   // CUR_PHOTO.append("photo", this.selectFile, this.selectFile.name);
    // }
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
