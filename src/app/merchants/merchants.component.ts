import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MerchantService } from '../merchant.service';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CreateMerchantComponent } from '../create-merchant/create-merchant.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmComponent } from '../confirm/confirm.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit {
  
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['merchantCode', 'displayName', 'fullName', 'actions','details', 'delete'];
  
  //paginator
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //sort
  
  public hideSideMenu = false;


  constructor(
    //calling the service (merchant.service.ts)
    //we connected angular service and component
    public merchantService: MerchantService,
    //connecting to other sites
    private router: Router,
    //dialog
    public dialog: MatDialog,
    //paginator

    private responsive: BreakpointObserver,
    //responsive
    
  ) { }

    

  ngOnInit(): void {
    this.merchantService.getMerchants().subscribe((results: any) => {
      //console.log('get merchants here: ', results);
      this.dataSource.data = results.merchants;
      //if we return list of merchants with ResponseMerchant, for ex. merchants, pageNumber, pages, then we need -this.dataSoutce.data = results.merchants-
      
      //paginator
      this.dataSource.paginator = this.paginator;

      //sort
      this.dataSource.sort = this.sort;

    });
    //console.log('test');
    //responsive design ->
    // this.responsive.observe([
    //   Breakpoints.TabletPortrait,
    //   Breakpoints.HandsetLandscape
    //   ]).subscribe(result => {
      
    //     this.hideSideMenu = false;

    //     const breakpoints = result.breakpoints;

    //   if(breakpoints[Breakpoints.TabletPortrait]){
    //     console.log('screen matches TabletPortrait');
    //     this.hideSideMenu = true;
    //     this.displayedColumns = ['merchantCode', 'displayName','actions','details', 'delete'];
    //   }

    //   else if(breakpoints[Breakpoints.HandsetLandscape]){
    //     console.log('screens matches HandsetLandscape');
    //   }

    //   else{
    //     this.hideSideMenu = false;
    //     this.displayedColumns = ['merchantCode', 'displayName', 'fullName', 'actions','details', 'delete'];
    //   } 

    // });
  }

  //open dialog method
  public openDialog(){
    //console.log('open dialog works');
    var dialogRef = this.dialog.open(CreateMerchantComponent,{height: '65%', width: '50%'});
    //update home page info
    //this.dialog.afterAllClosed.subscribe(result =>{
     // this.ngOnInit();
    //});
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  public navigateToDetails(merchantCode: string){
    //console.log('merchantCode',merchantCode);
    this.router.navigate(['merchants/' + merchantCode]);
  }

  public navigateToStores(merchantCode: string){
    this.router.navigate(['merchants/' + merchantCode + '/stores']);
  }

  public deleteMerchant(merchantCode: string){
    var dialogRef = this.dialog.open(ConfirmComponent);
    var confirm;

    dialogRef.afterClosed().subscribe((data: any) => {
        confirm = data;
        //console.log(confirm);
    
        if(confirm == true){
          //console.log('deleted merchant:',merchantCode);
          this.merchantService.deleteMerchant(merchantCode).subscribe(() => {
            //this.ngOnInit();
            const data = this.dataSource.data;
      
            const index = data.findIndex((item: any) => item.merchantCode === merchantCode);
      
            data.splice(index, 1);
            this.dataSource.data = data;
          });    
        }
    
    });
    
    
  }


  public applyFilter(filterValue: any){
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }

}
