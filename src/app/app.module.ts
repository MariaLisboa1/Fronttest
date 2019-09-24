import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./security/login/login.component";
import { SharedModule } from "./shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./core/components/register/register.component";
import { CoreModule } from "./core/core.module";
import { UsersService } from "./security/login/users.service";
import { HttpClientModule } from "@angular/common/http";
import { Toast } from "./shared/helpers/Toast/toast";
import { LoggedInGuard } from "./security/loggedin.guard";
import { RedefinePasswordComponent } from "./core/components/redefine-password/redefine-password.component";

import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RedefinePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [UsersService, Toast, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
