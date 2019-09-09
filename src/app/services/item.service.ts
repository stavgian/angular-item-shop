import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Item } from "../models";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  // Base url
  baseurl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  // POST
  createItem(data): Observable<Item> {
    return this.http
      .post<Item>(
        this.baseurl + "/item/",
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // GET
  getItem(id): Observable<Item> {
    return this.http.get<Item>(this.baseurl + "/item/" + id).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  // GET
  getItems(): Observable<Item> {
    return this.http.get<Item>(this.baseurl + "/items/").pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  // PUT
  updateItem(id, data): Observable<Item> {
    return this.http
      .put<Item>(
        this.baseurl + "/item/" + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // DELETE
  deleteItem(id) {
    return this.http
      .delete<Item>(this.baseurl + "/item/" + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // Error handling
  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
