import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./security/login/login.component";
import { SharedModule } from "./shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./core/components/register/register.component";
import { CoreModule } from "./core/core.module";
import { HomeComponent } from "./core/components/home/home.component";
import { UsersService } from "./security/login/users.service";
import { HttpClientModule } from "@angular/common/http";
import { Toast } from "./shared/helpers/Toast/toast";
import { LoggedInGuard } from "./security/loggedin.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [UsersService, Toast, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
