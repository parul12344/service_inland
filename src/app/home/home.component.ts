import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  categoriesArr;
  tempData;
  
  constructor(private service:MyserviceService) { }

  ngOnInit() {
   this.categoriesArr = [];     
   this.service.getCategories().subscribe(data  => { 
       var dataArr = data['data'];
       for (let d of dataArr) {
           this.categoriesArr.push({
               'id':d['id'],
               'name':d['name'],
               'img_name':d['img'],
               'description':d['desc'],
           });
       }
    },
    error  => {
	console.log("Error", error);
    });	
  }
}
