import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ButtonComponent } from "./components/button/button.component";
import { UserDetailComponent } from "./components/header/user-detail/user-detail.component";
import { InputComponent } from "./components/input/input.component";
import { ViewPasswordComponent } from "./components/view-password/view-password.component";
import { NgxMaskModule } from "ngx-mask";
import { AppRoutingModule } from "../app-routing.module";
import { FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  imports: [NgxMaskModule.forRoot(), CommonModule, AppRoutingModule],
  declarations: [
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    UserDetailComponent,
    InputComponent,
    ViewPasswordComponent
  ],
  exports: [
    AppRoutingModule,
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    UserDetailComponent,
    InputComponent,
    ViewPasswordComponent,
    CommonModule,

    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class SharedModule {}
