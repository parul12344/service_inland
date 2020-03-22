import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  
  sub_cat;
  cat_name;
  cat_desc;
  dataArr:any;    
  constructor(private service:MyserviceService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {

 let id = this.route.snapshot.paramMap.get('id');

 this.dataArr = [];     
   this.service.getCategories().subscribe(data  => { 
       var dataArr = data['data'];
       console.log(dataArr);
       for (let d of dataArr) {
          if(d['id'] == id){
          this.cat_name=d['name'];
            this.cat_desc=d['desc'];
            this.dataArr = d['children'];
              break;
          }
        
       }
       this.prepaerSubCategoryData();
    },
    error  => {
        console.log("Error", error);
    }); 
}

 prepaerSubCategoryData(){

    this.sub_cat = [];
     for (let d of this.dataArr) {
           this.sub_cat.push({
               'id':d['id'],
               'name':d['name'],
               'img_name':d['img'],
               'description':d['desc'],
           });
      }
  }

}
