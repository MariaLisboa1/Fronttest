import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./security/login/login.component";
import { RegisterComponent } from "./core/components/register/register.component";
import { LoggedInGuard } from "./security/loggedin.guard";
import { RedefinePasswordComponent } from "./core/components/redefine-password/redefine-password.component";
import { EditProfileComponent } from "./core/components/edit-profile/edit-profile.component";
import { HomeComponent } from "./core/components/home/home.component";

const routes: Routes = [
  {
    path: "login",
    loadChildren: "./security/login/login.module#loginModule"
  },
  { path: "register", component: RegisterComponent },
  { path: "redefinePassword", component: RedefinePasswordComponent },
  {
    path: "home",
    component: HomeComponent
    // loadChildren: "./core/components/home/home.module#homeModule"
    // canLoad: [LoggedInGuard]
  },
  {
    path: "EditProfile",
    component: EditProfileComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
