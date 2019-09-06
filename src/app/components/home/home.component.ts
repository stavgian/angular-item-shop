import { Component, OnInit } from "@angular/core";
import { ItemsService } from "../../shared/items.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  itemList: any = [];
  constructor(public itemsService: ItemsService) {}

  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    return this.itemsService.getItems().subscribe((data: {}) => {
      this.itemList = data;
    });
  }
}
