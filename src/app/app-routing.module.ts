import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./security/login/login.component";
import { RegisterComponent } from "./core/components/register/register.component";
import { LoggedInGuard } from "./security/loggedin.guard";
import { RedefinePasswordComponent } from "./core/components/redefine-password/redefine-password.component";
import { EditProfileComponent } from "./core/components/edit-profile/edit-profile.component";
import { HomeComponent } from "./core/components/home/home.component";
import { Error404Component } from "./shared/components/error404/error404.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "redefinePassword", component: RedefinePasswordComponent },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "EditProfile",
    component: EditProfileComponent,
    canActivate: [LoggedInGuard]
  },
  { path: "**", component: Error404Component }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
