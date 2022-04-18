import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent implements OnInit {

  public storeCodeFormControl: FormControl = new FormControl('', [Validators.required]);
  public phoneNumberFormControl: FormControl = new FormControl();
  public displayNameFormControl: FormControl = new FormControl('', [Validators.required]);
  public cityFormControl: FormControl = new FormControl();
  public addressFormControl: FormControl = new FormControl();
  public emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  store: any;

  merchantCode!: string;


  constructor(
    private merchantService: MerchantService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<CreateStoreComponent>,
    @Inject(MAT_DIALOG_DATA) data: { route: ActivatedRoute }
  ) {
    //getting route parameters of the original path, because dialog is not getting the route parameters auto
    data.route.params.subscribe(params => { this.merchantCode = params['merchantCode'] });
  }

  ngOnInit() {
    //console.log('trying',this.merchantCode);
  }


  public createStore() {
    //console.log('creating new store');

    if (this.storeCodeFormControl.value != '' && this.displayNameFormControl.value != '' && this.emailFormControl.value != '') {
      this.store = {
        storeCode: this.storeCodeFormControl.value,
        displayName: this.displayNameFormControl.value,
        address: this.addressFormControl.value + ", " + this.cityFormControl.value,
        phoneNumber: this.phoneNumberFormControl.value,
        email: this.emailFormControl.value,
      };

      //console.log('merchant code->',this.merchantCode);
      //console.log('new store details',this.store); 

      this.merchantService.createStore(this.merchantCode, this.store).subscribe(() => {
        this.dialogRef.close();
      });

    }
    else { console.log('some of the values are null'); }
  }
}
