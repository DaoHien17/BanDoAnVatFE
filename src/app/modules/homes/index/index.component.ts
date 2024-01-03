import { ApiService } from './../../../core/services/api.service';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { CartService } from 'src/app/core/services/cart.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent extends BaseComponent implements OnInit,AfterViewInit {
  public list_item:any;
  public sp_moi: any;
  public originListItems: any;
  quantity = 1;
  public loaisp:any;
  products:any[]=[];
  subtotal:any;
  page: number=1;
  count:number=0;
  tableSize:number=4;
  tableSizes:any=[20,30,40,50]

  constructor( injector: Injector,private _cart: CartService ) {
    super(injector);

   }

  onSlideChange() {
    console.log('slide change');
  }


  ngOnInit(): void {
    this.getAllProducts();
    this.getNewProducts();
    this._api.get('/api/Home/LoaiSanPham/Get').subscribe((res: any) => {
      this.loaisp = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
      });
    });

  }
  public addToCart(item: any) {
    item.quantity = this.quantity;
    console.log(this.quantity);
    this._cart.addToCart(item);
    // this._send.addObjct(this._cart.getItems().length);
    window.location.reload();
    alert('Đã thêm vào giở hàng thành công');
  }

  getAllProducts() {
    this._api.get('/api/Home/SanPham/Get').subscribe(res => {
      this.list_item = res;
      this.count = res.length;
      this.originListItems = res;
      console.log(res);
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
  onTableDataChange(event:any){
    this.page = event;
    // this.getAllProducts();
  }
  onTableSizeChange(event:any):void{
    console.log([event.target.value]);
    this.tableSize = Number(event.target.value);
    this.page = 1;
  }
  getNewProducts() {
    this._api.get('/api/Products/get-sp-moi-nhat').subscribe(res => {
      this.sp_moi = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' );
      });
    });
  }
  ngAfterViewInit() {
    //this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' );
  }

}

