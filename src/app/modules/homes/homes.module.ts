import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { CuahangComponent } from './cuahang/cuahang.component';
import { CartComponent } from './cart/cart.component';
import { SwiperModule } from 'swiper/angular';
import {NgxPaginationModule, PaginationService} from 'ngx-pagination';


import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';
import { SpLoaiComponent } from './sploai/sploai.component';

@NgModule({
  declarations: [
    IndexComponent,
    DetailComponent,
    CuahangComponent,
    CartComponent,
    ThanhtoanComponent, 
    SpLoaiComponent
    
  ],
  imports: [
    CommonModule,
    SwiperModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'detail/:id', component: DetailComponent },
      { path: 'index', component: IndexComponent },
      { path: 'cart', component: CartComponent },
      { path: 'thanhtoan', component: ThanhtoanComponent },
      { path: 'sploai/:id', component: SpLoaiComponent },
    ])
  ],
  
})
export class HomesModule { }
