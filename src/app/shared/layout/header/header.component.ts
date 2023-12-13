import { CartService } from 'src/app/core/services/cart.service';
import { SendService } from 'src/app/core/services/send.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  public list_item:any;
  public list_loaisp:any;
  public sp_moi: any;
  public originListItems: any;
  public loaisp:any;
  products:any[]=[];
  subtotal:any;
  page: number=1;
  count:number=0;
  tableSize:number=4;
  tableSizes:any=[20,30,40,50]
  public sosanphams:any=0;
  // _api: any;
  constructor(injector: Injector,private _send: SendService, private _cart: CartService) {
    super(injector);
  }

  ngOnInit(): void {
    this.sosanphams=this._cart.getItems().length;
    // this._send.objs.subscribe((res: any) => {
    //   if(res) {
    //     this.sosanphams=res;
    //   }
    // });

    this._api.get('/api/Home/LoaiSanPham/Get').subscribe((res: any) => {

      this.loaisp = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
      });
    });

    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/Home/GetSPtheoLoai/1').subscribe(res => {
      this.list_loaisp = res;
      console.log(res);

      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' );
      });
    });
    });

  }
  getAllProducts() {
    this._api.get('/api/Home/SanPham/Get').subscribe(res => {
      this.list_item = res;
      this.count = res.length;
      this.originListItems = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' );
      });
    });
  }

  async handleChangeCategory(maloai: any) {
    if(maloai) {
      this.list_item = this.originListItems.filter((item: any) => item.maLoaiSanPham === maloai);
    }
    else
      this.list_item = this.originListItems;
    this.count = this.list_item.length;
    this.page = 1;
    this.tableSize = this.tableSize;
  }

}
