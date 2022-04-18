import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

constructor(
  private http: HttpClient
) { }

public getMerchants(){
  //returns list of merchants
  //console.log('here we get the merchants');

  return this.http.get('https://localhost:7066/api/merchants');
}

public getMerchant(merchantCode: string){
  return this.http.get('https://localhost:7066/api/merchants/'+merchantCode);
}


public createMerchant(body: any){
  return this.http.post('https://localhost:7066/api/merchants', body);
}

public updateMerchant(merchantCode:string, body: any){
  return this.http.put('https://localhost:7066/api/merchants/'+merchantCode, body);
}

public deleteMerchant(merchantCode: string){
  return this.http.delete('https://localhost:7066/api/merchants/'+merchantCode);
}

public getStores(merchantCode: string){
  return this.http.get('https://localhost:7066/api/merchants/' +merchantCode+ '/stores');
}

public createStore(merchantCode: string, body: any){
  return this.http.post('https://localhost:7066/api/merchants/' +merchantCode+ '/stores', body);
}

public deleteStore(merchantCode:string, storeCode: string){
  return this.http.delete('https://localhost:7066/api/merchants/'+merchantCode+'/stores/'+storeCode);
}

public getStore(merchantCode: string, storeCode: string){
  return this.http.get('https://localhost:7066/api/merchants/'+merchantCode+'/stores/'+storeCode);
}

public updateStore(merchantCode: string, storeCode: string, body: any){
  return this.http.put('https://localhost:7066/api/merchants/'+merchantCode+'/stores/'+storeCode, body);
}

}

//to call the service, we go to merchants.component.ts and call it in the constructor