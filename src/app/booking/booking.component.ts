import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
    
  bookingForm:FormGroup;
  category;
  subCategory;
  idDirect:boolean;
  dataArr:any;
  categoriesArr:any;
  subCategoriesArr:any;
  submitted = false;
  CSRF_TOKEN:any;
  success:boolean = false;
  booking_msg:any;
  
  constructor(private service:MyserviceService, private route: ActivatedRoute,private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
        this.idDirect = true;
        this.displaySelectedDetails(id);
    } 
    else {
        this.idDirect = false;
        this.displayAllCategory();
    }
    
    this.bookingForm = this.formBuilder.group({
         t:  new FormControl(''),
         name: new FormControl('', Validators.required),
         email: new FormControl('', Validators.required),
         category: new FormControl('', Validators.required),
         sub_category: new FormControl('', Validators.required),
         location: new FormControl('', Validators.required),
         date: new FormControl('', Validators.required),
         time: new FormControl('', Validators.required),
         phone_num: new FormControl('', [Validators.required,Validators.minLength(10)]),
         address: new FormControl('', Validators.required)
     });
     this.bookingForm.controls['t'].setValue('booking');
  }
  
  // convenience getter for easy access to form fields
  get f() { 
        return this.bookingForm.controls; 
  }
    
  displaySelectedDetails(id){
    this.service.getSubCategoriesById(id).subscribe(data  => {
        this.category = data['data']['catName'];
        this.subCategory = data['data']['sCatName'];
    },
    error  => {
        console.log("Error", error);
    });
  }
  
  
  displayAllCategory(){
    this.categoriesArr = [];  
    this.service.getCategories().subscribe(data  => {         
       this.dataArr = data['data']; 
       for (let d of this.dataArr) { 
           this.categoriesArr.push({
               'name':d['name']
           });
       }
    },
    error  => {
        console.log("Error", error);
    });
    
  }

  
  getSubCategory(cName){

      for (let d of this.dataArr) { 
          if(d['name'] == cName){
            this.subCategoriesArr = d['children'];
            break;
          }
       }
  }



  saveBookingData() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.bookingForm.invalid) {
            return;
        }
        let formData = this.bookingForm.value;
        formData['_token'] = this.CSRF_TOKEN;
        this.service.saveBookingData(JSON.stringify(formData)).subscribe(data  => {
          let resultArr = data['data'];
          this.success = true;
		      this.booking_msg = resultArr['msg'];
      });
      this.submitted = false;
      this.bookingForm.reset();
      this.bookingForm.markAsPristine();
   }
}
