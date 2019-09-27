import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { RedefinePasswordComponent } from "./components/redefine-password/redefine-password.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "../security/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";
import { UsersService } from "../security/login/users.service";
import { NgxMaskModule } from "ngx-mask";

import { HomeComponent } from "./components/home/home.component";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    RegisterComponent,
    HomeComponent,
    RedefinePasswordComponent,
    EditProfileComponent,
    LoginComponent
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RedefinePasswordComponent,
    EditProfileComponent,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UsersService]
})
export class CoreModule {}
