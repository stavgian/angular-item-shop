import { Component } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Item } from "../models";
import { UserService, AuthenticationService, ItemService } from "../services";

@Component({
  templateUrl: "home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  loading = false;
  items: any = [];
  currentUser: User;
  userFromApi: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private itemsService: ItemService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.getItems();
    this.loading = true;
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService
      .getById(this.currentUser.id)
      .pipe(first())
      .subscribe(user => {
        this.loading = false;
        this.userFromApi = user;
      });
  }

  getItems() {
    this.itemsService.getItems().subscribe(data => {
      this.items = data;
      console.log(data);
    });
  }
}
