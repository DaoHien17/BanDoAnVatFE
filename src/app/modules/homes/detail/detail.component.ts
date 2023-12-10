import { CartService } from 'src/app/core/services/cart.service';
import { SendService } from 'src/app/core/services/send.service';
import { ApiService } from './../../../core/services/api.service';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends BaseComponent implements OnInit, AfterViewInit {
  public list_loaisp: any;
  public item: any;
  public originListItems: any;
  public quantity: number = 1;
  constructor(injector: Injector, private _cart: CartService, private _send: SendService) {
    super(injector);
  }

  public handleChangeQuantity(status: boolean) {
    if (status) {
      this.quantity++;
    }
    else if (!status && this.quantity > 1) {
      this.quantity--;
    }
  }

  public addToCart(item: any) {
    item.quantity = this.quantity;
    console.log(this.quantity);
    this._cart.addToCart(item);
    // this._send.addObjct(this._cart.getItems().length);
    window.location.reload();
    alert('Đã thêm vào giở hàng thành công');
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/Home/GetSPtheoId/' + id).subscribe(res => {
        this.item = res;
        this._api.get('/api/Home/GetSPtheoLoai/' + this.item[0].maLoaiSanPham).subscribe(res => {
          this.list_loaisp = res;        
        });
        setTimeout(() => {
          this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
        });
      });
    });
  }
  // getAllProducts() {
  //   this._api.get('/api/Home/SanPham/Get').subscribe(res => {
  //     this.item = res;
  //     this.originListItems = res;
  //     setTimeout(() => {
  //       this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
  //     });
  //   });
  //   this._route.params.subscribe(params => {
  //     let id = params['id'];
  //     this._api.get('/api/Home/GetSPtheoLoai/' + id).subscribe(res => {
  //       this.list_loaisp = res;
  //       console.log(res);

  //       setTimeout(() => {
  //         this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
  //       });
  //     });
  //   });
  // }


  ngAfterViewInit() {
    this.loadScripts('assets/js/image_product.js', 'assets/js/hide_menu.js', 'assets/js/cart.js');
  }

}
