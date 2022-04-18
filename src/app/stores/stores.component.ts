import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { CreateStoreComponent } from '../create-store/create-store.component';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['storeCode', 'displayName', 'merchantCode', 'actions', 'details'];

  public titleText!: string;
  public detailsText!: string;
  public merchantCode!: string;
  
  public fullName!: string;
  public address!: string;
  public phoneNumber!: string;
  public email!: string;
  public website!: string;
  public accountNumber!: string;

  public merchantCodeFormControl: FormControl = new FormControl();
  public displayNameFormControl: FormControl = new FormControl();
  public fullNameFormControl: FormControl = new FormControl();
  public addressFormControl: FormControl = new FormControl();
  public phoneNumberFormControl: FormControl = new FormControl();
  public emailFormControl: FormControl = new FormControl();
  public websiteFormControl: FormControl = new FormControl();
  public accountNumberFormControl: FormControl = new FormControl();
  
  public merchant: any;
  public stores: any;

  //paginator
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //sort

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit () {
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

      this.merchantService.getStores(merchantCode).subscribe((stores) => {
        this.stores = stores;
        //console.log(stores);
        
        this.dataSource.data = this.stores.stores;
        this.merchantCode = merchantCode;
        
        //paginator
        this.dataSource.paginator = this.paginator;

        //sort
        this.dataSource.sort = this.sort;

        
      });
      
      
     
    });
  }

  private initFormControls(){
    this.merchantCodeFormControl = new FormControl(this.merchant.merchantCode);
    this.displayNameFormControl = new FormControl(this.merchant.displayName);
    this.fullNameFormControl = new FormControl(this.merchant.fullName);
    this.addressFormControl = new FormControl(this.merchant.address);
    this.phoneNumberFormControl = new FormControl(this.merchant.phoneNumber);
    this.emailFormControl = new FormControl(this.merchant.email);
    this.websiteFormControl = new FormControl(this.merchant.website);
    this.accountNumberFormControl = new FormControl(this.merchant.accountNumber);

    this.titleText = this.displayNameFormControl.value + ' (' + this.merchantCodeFormControl.value + ')';
    this.detailsText = 'Full name: '+this.fullNameFormControl.value + "<br />" + 'Address: '+this.addressFormControl.value + "<br />" + 'Phone number: '+this.phoneNumberFormControl.value + "<br />" + 'Email: '+this.emailFormControl.value + "<br />" + 'Website: '+this.websiteFormControl.value + "<br />" + 'Account number: '+this.accountNumberFormControl.value;
    
    this.fullName = this.fullNameFormControl.value;
    this.address = this.addressFormControl.value;
    this.phoneNumber = this.phoneNumberFormControl.value;
    this.email = this.emailFormControl.value;
    this.website = this.websiteFormControl.value;
    this.accountNumber = this.accountNumberFormControl.value;
    //console.log(this.detailsText);
  }
  
  public openDialog(){
    console.log('open dialog works');
    var dialogRef = this.dialog.open(CreateStoreComponent,{data: {route: this.route},height: '50%', width: '40%'});
    //update home page info
    //this.dialog.afterAllClosed.subscribe((result) =>{
     // this.ngOnInit();
    //});
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  
  public deleteStore(merchantCode: string, storeCode: string){
    var dialogRef = this.dialog.open(ConfirmComponent);
    var confirm;

    dialogRef.afterClosed().subscribe((data: any) => {
      confirm = data;
      //console.log(confirm);
    if(confirm == true){
    console.log('deleted store:',storeCode);
    this.merchantService.deleteStore(merchantCode, storeCode).subscribe(() => {
      //this.ngOnInit();
      
      const data = this.dataSource.data;

      const index = data.findIndex((item: any) => item.storeCode === storeCode);

      data.splice(index, 1);
      this.dataSource.data = data;

    });    
  }
  });
  }

  public navigateToDetails(merchantCode: string, storeCode: string){
    //console.log('merchantCode->',merchantCode,'storeCode->',storeCode);
    this.router.navigate(['merchants/' + merchantCode + '/stores/' + storeCode]);
  }

  public applyFilter(filterValue: any){
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }

  public backToMerchants(){
    this.router.navigate(['merchants']);
  }

}
