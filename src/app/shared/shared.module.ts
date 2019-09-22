import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ButtonComponent } from "./components/button/button.component";
import { UserDetailComponent } from "./components/header/user-detail/user-detail.component";
import { NotificationService } from "./messages/notification.service";
import { SnackbarComponent } from "./messages/snackbar/snackbar.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    UserDetailComponent,
    SnackbarComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    UserDetailComponent
  ],
  providers: [NotificationService]
})
export class SharedModule {}
