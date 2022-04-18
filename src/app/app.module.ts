import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MerchantComponent } from './merchant/merchant.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateMerchantComponent } from './create-merchant/create-merchant.component';
import { MatSortModule } from '@angular/material/sort';
import { StoresComponent } from './stores/stores.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { StoreComponent } from './store/store.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ConfirmComponent } from './confirm/confirm.component';
import { FlexLayoutModule } from '@angular/flex-layout';

 
@NgModule({
  declarations: [						
    AppComponent,
    MerchantsComponent,
      MerchantComponent,
      CreateMerchantComponent,
      StoresComponent,
      CreateStoreComponent,
      StoreComponent,
      ConfirmComponent
   ],

  entryComponents: [
    CreateMerchantComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
