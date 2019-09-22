import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  notifier = new EventEmitter<string>();
  constructor() {}

  notify(message: string) {
    this.notifier.emit(message);
    console.log(message);
  }
}
