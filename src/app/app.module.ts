import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { DisclamierComponent } from './disclamier/disclamier.component';
import { MyserviceService } from './myservice.service';
import { HttpClientModule,HttpClientXsrfModule } from '@angular/common/http';
import { BookingComponent } from './booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    TermsConditionsComponent,
    DisclamierComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
         {
            path: 'about',
            component: AboutComponent
         },
         {
            path: '',
            component: HomeComponent
         },
          {
            path: 'services',
            component: ServicesComponent
         },
         {
            path: 'contact',
            component: ContactComponent
         },
         {
            path: 'terms_conditions',
            component: TermsConditionsComponent
         },
          {
            path: 'disclamier',
            component: DisclamierComponent
         },{
            path: 'services/:id',
            component: ServicesComponent
         },
         {
            path: 'booking',
            component: BookingComponent
         },{
            path: 'booking/:id',
            component: BookingComponent
         }


      ])
  ],
  providers: [MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
