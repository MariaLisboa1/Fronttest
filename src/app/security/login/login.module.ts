import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginComponent } from "./login.component";

const ROUTES: Routes = [{ path: "", component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forChild(ROUTES), SharedModule]
})
export class loginModule {}
