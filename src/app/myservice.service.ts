import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from  "@angular/common/http";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  
  apiUrl:any = 'http://serviceinland.com/php/handler.php';
    
  constructor(private  httpClient:HttpClient) { }
  

  //get data
  getCategories(){
    let url = this.apiUrl;
    let data = {"t":"category"};
    var headers = new HttpHeaders({'Content-Type':'application/json'}); 
    return this.httpClient.post(url, data, {headers:headers});
  }


  // get Sub categories
  getSubCategoriesById(id){
    let url = this.apiUrl;
    let data = {"t":"sub-category", "sCatId":id};
    var headers = new HttpHeaders({'Content-Type':'application/json'}); 
    return this.httpClient.post(url, data, {headers:headers});
  }

  //Booking Post Data
  saveBookingData(data){
    let url = this.apiUrl;
    var headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(url, data, {headers:headers});
  }


}
