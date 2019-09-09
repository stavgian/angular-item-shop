import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { User } from "../models";
import { UserService } from "../services";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  loading = false;
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.loading = false;

        console.log(users);
        this.users = users;
      });
  }
}
