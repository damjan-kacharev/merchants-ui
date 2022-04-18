import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {

  public merchantCodeFormControl: FormControl = new FormControl();
  public displayNameFormControl: FormControl = new FormControl();
  public fullNameFormControl: FormControl = new FormControl();
  public addressFormControl: FormControl = new FormControl();
  public phoneNumberFormControl: FormControl = new FormControl();
  public emailFormControl: FormControl = new FormControl();
  public websiteFormControl: FormControl = new FormControl();
  public accountNumberFormControl: FormControl = new FormControl();

  public merchant: any;

  public detailsText!: string;

  public merchantCode!: string;
  public displayName!: string;
  public fullName!: string;
  public address!: string;
  public phoneNumber!: string;
  public email!: string;
  public website!: string;
  public accountNumber!: string;
  
  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,

    private router: Router
  ) { }

  ngOnInit() {
    //if we need query parameters we need to go like this -> this.route.queryparams...
    this.route.params.subscribe((params: any) => {
      //console.log('params',params);
      const merchantCode = params.merchantCode;
      //console.log('merchantCode',merchantCode);

      this.merchantService.getMerchant(merchantCode).subscribe((merchant) => {
        //console.log('merchant:', merchant);
        //setting the variable merchant with the value of student from the API
        this.merchant = merchant;
        this.initFormControls();
      });
      
    });
  }

  public backToMerchants(){
    this.router.navigate(['merchants']);
  }

  public updateMerchant(){

    if(this.fullNameFormControl.value != '' && this.emailFormControl.value != '' && this.accountNumberFormControl.value != '')
    {
    this.merchant.displayName = this.displayNameFormControl.value;
    this.merchant.fullName = this.fullNameFormControl.value;
    this.merchant.address = this.addressFormControl.value;
    this.merchant.phoneNumber = this.phoneNumberFormControl.value;
    this.merchant.email = this.emailFormControl.value;
    this.merchant.website = this.websiteFormControl.value;
    this.merchant.accountNumber = this.accountNumberFormControl.value;    

    this.merchantService.updateMerchant(this.merchant.merchantCode, this.merchant).subscribe(() => {
    //this.detailsText ='Merchant Code: ' + this.merchantCodeFormControl.value+ "<br />" +'Display name: '+ this.displayNameFormControl.value + "<br />" + 'Full name: ' +this.fullNameFormControl.value + "<br />" + 'Address: ' +this.addressFormControl.value + "<br />" + 'Phone number: ' +this.phoneNumberFormControl.value + "<br />" + 'Email: ' +this.emailFormControl.value+ "<br />" + 'Website: ' +this.websiteFormControl.value + "<br />" + 'Account number: ' +this.accountNumberFormControl.value;
    this.displayName = this.displayNameFormControl.value;
    this.fullName = this.fullNameFormControl.value;
    this.address = this.addressFormControl.value;
    this.phoneNumber = this.phoneNumberFormControl.value;
    this.email = this.emailFormControl.value;
    this.website = this.websiteFormControl.value;
    this.accountNumber = this.accountNumberFormControl.value;
    });

  }
  else{console.log('some of the values are null');}

  }


  private initFormControls(){
    this.merchantCodeFormControl = new FormControl(this.merchant.merchantCode);
    this.displayNameFormControl = new FormControl(this.merchant.displayName);
    this.fullNameFormControl = new FormControl(this.merchant.fullName,[Validators.required]);
    this.addressFormControl = new FormControl(this.merchant.address);
    this.phoneNumberFormControl = new FormControl(this.merchant.phoneNumber);
    this.emailFormControl = new FormControl(this.merchant.email, [Validators.required, Validators.email]);
    this.websiteFormControl = new FormControl(this.merchant.website);
    this.accountNumberFormControl = new FormControl(this.merchant.accountNumber, [Validators.required]);

    //this.detailsText ='Merchant Code: ' + this.merchantCodeFormControl.value+ "<br />" +'Display name: '+ this.displayNameFormControl.value + "<br />" + 'Full name: ' +this.fullNameFormControl.value + "<br />" + 'Address: ' +this.addressFormControl.value + "<br />" + 'Phone number: ' +this.phoneNumberFormControl.value + "<br />" + 'Email: ' +this.emailFormControl.value+ "<br />" + 'Website: ' +this.websiteFormControl.value + "<br />" + 'Account number: ' +this.accountNumberFormControl.value;
    this.merchantCode = this.merchantCodeFormControl.value;
    this.displayName = this.displayNameFormControl.value;
    this.fullName = this.fullNameFormControl.value;
    this.address = this.addressFormControl.value;
    this.phoneNumber = this.phoneNumberFormControl.value;
    this.email = this.emailFormControl.value;
    this.website = this.websiteFormControl.value;
    this.accountNumber = this.accountNumberFormControl.value;
  }

}
