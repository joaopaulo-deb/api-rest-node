import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { ChargesComponent } from "./views/charges/charges.component";
import { ChargeCreateComponent } from "./components/charge/charge-create/charge-create.component";
import { ChargeQrcodeComponent } from './components/charge/charge-qrcode/charge-qrcode.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "charges",
    component: ChargesComponent
  },
  {
    path: "charges/create",
    component: ChargeCreateComponent
  },
  {
    path: "charges/qrCode/:id",
    component: ChargeQrcodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
