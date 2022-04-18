import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantComponent } from './merchant/merchant.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { StoreComponent } from './store/store.component';
import { StoresComponent } from './stores/stores.component';

const routes: Routes = [
  {
    path: 'merchants', component: MerchantsComponent
  },
  {
    path: 'merchants/:merchantCode', component: MerchantComponent
  },
  {
    path: 'merchants/:merchantCode/stores', component: StoresComponent
  },
  {
    path: 'merchants/:merchantCode/stores/:storeCode', component: StoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
