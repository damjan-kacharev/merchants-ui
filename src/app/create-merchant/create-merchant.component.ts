import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls: ['./create-merchant.component.scss']
})
export class CreateMerchantComponent implements OnInit {
  public merchantCodeFormControl: FormControl = new FormControl('', [Validators.required]);
  public displayNameFormControl: FormControl = new FormControl();
  public fullNameFormControl: FormControl = new FormControl('', [Validators.required]);
  public cityFormControl: FormControl = new FormControl();
  public addressFormControl: FormControl = new FormControl();
  public phoneNumberFormControl: FormControl = new FormControl();
  public emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public websiteFormControl: FormControl = new FormControl();
  public accountNumberFormControl: FormControl = new FormControl('', [Validators.required]);

  merchant: any;

  constructor(
    private merchantService: MerchantService,
    public dialogRef: MatDialogRef<CreateMerchantComponent>
  ) { }

  ngOnInit() {
     
  }

  public createMerchant(){
    //console.log('creating new merchant');    

    if(this.merchantCodeFormControl.value != '' && this.fullNameFormControl.value != '' && this.emailFormControl.value != '' && this.accountNumberFormControl.value != '')
    {
    this.merchant = {
      merchantCode: this.merchantCodeFormControl.value,
      displayName: this.displayNameFormControl.value,
      fullName: this.fullNameFormControl.value,
      address: this.addressFormControl.value + ", " + this.cityFormControl.value,
      phoneNumber: this.phoneNumberFormControl.value,
      email: this.emailFormControl.value,
      website: this.websiteFormControl.value,
      accountNumber: this.accountNumberFormControl.value
    }; 

    //console.log('new merchant details',this.merchant);

    this.merchantService.createMerchant(this.merchant).subscribe(() => {
      this.dialogRef.close();
    });

    }
    else{console.log('some of the values are null');}
  }

}
