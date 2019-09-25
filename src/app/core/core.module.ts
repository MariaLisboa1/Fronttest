import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [EditProfileComponent],
  exports: [CommonModule, FormsModule],
  providers: []
})
export class CoreModule {}
