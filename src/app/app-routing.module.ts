import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home";
import { AdminComponent } from "./admin";
import { MerchantComponent } from "./merchant";
import { LoginComponent } from "./login";
import { RegisterComponent } from "./register";
import { AuthGuard } from "./helpers";
import { Role } from "./models";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "dashboard",
    component: MerchantComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Merchant] }
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
