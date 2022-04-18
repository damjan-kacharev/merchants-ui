import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from '../merchant.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public detailsText!: string;

  store: any;
  public storeCode!: string;
  public merchantCode!: string;

  public storeCodeFormControl: FormControl = new FormControl();
  public displayNameFormControl: FormControl = new FormControl();
  public addressFormControl: FormControl = new FormControl();
  public phoneNumberFormControl: FormControl = new FormControl();
  public emailFormControl: FormControl = new FormControl();

  public name!: string;
  public address!: string;
  public phoneNumber!: string;
  public email!: string;
  

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      //console.log('route params:', params);
      this.merchantCode = params.merchantCode;
      this.storeCode = params.storeCode;
    });

    this.merchantService.getStore(this.merchantCode, this.storeCode).subscribe((store) => {
      this.store = store;
      //console.log(store);
      this.initFormControls();
    });
  }

    private initFormControls(){
      this.storeCodeFormControl = new FormControl(this.store.storeCode);
      
      this.displayNameFormControl = new FormControl(this.store.displayName,[Validators.required]);
      this.addressFormControl = new FormControl(this.store.address);
      this.phoneNumberFormControl = new FormControl(this.store.phoneNumber);
      this.emailFormControl = new FormControl(this.store.email,[Validators.required, Validators.email]);
  
      this.detailsText ='Merchant Code: ' + this.merchantCode+ "<br />" +'Store code: '+ this.storeCodeFormControl.value + "<br />" + 'Name: ' +this.displayNameFormControl.value + "<br />" + 'Address: ' +this.addressFormControl.value + "<br />" + 'Phone number: ' +this.phoneNumberFormControl.value + "<br />" + 'Email: ' +this.emailFormControl.value;
      this.name = this.displayNameFormControl.value;
      this.address = this.addressFormControl.value;
      this.phoneNumber = this.phoneNumberFormControl.value;
      this.email = this.emailFormControl.value;
      //console.log(this.detailsText);
    }

    public updateStore(){

      if (this.displayNameFormControl.value != '' && this.emailFormControl.value != '') {
      this.store.displayName = this.displayNameFormControl.value;
      this.store.address = this.addressFormControl.value;
      this.store.phoneNumber = this.phoneNumberFormControl.value;
      this.store.email = this.emailFormControl.value;

      //console.log('the new store', this.store);

      this.merchantService.updateStore(this.merchantCode, this.store.storeCode, this.store).subscribe(() => {
        this.detailsText ='Merchant Code: ' + this.merchantCode+ "<br />" +'Store code: '+ this.storeCodeFormControl.value + "<br />" + 'Name: ' +this.displayNameFormControl.value + "<br />" + 'Address: ' +this.addressFormControl.value + "<br />" + 'Phone number: ' +this.phoneNumberFormControl.value + "<br />" + 'Email: ' +this.emailFormControl.value;
        this.name = this.displayNameFormControl.value;
        this.address = this.addressFormControl.value;
        this.phoneNumber = this.phoneNumberFormControl.value;
        this.email = this.emailFormControl.value;
      });
    }
    else{console.log('some of the values are null');}
    }

    public backToStores(){
      this.router.navigate(['merchants/'+this.merchantCode+'/stores']);
    }

  }


