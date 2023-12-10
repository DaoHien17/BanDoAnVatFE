import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit, AfterViewInit {
  public list: any;
  public tTong: any;
  constructor(injector: Injector, private _cart: CartService, private _router: Router) {
    super(injector);
  }
  public ThanhToan () {
    this._router.navigate(['/homes/thanhtoan']);
  }
  ngOnInit(): void {
    const local_storage : any = localStorage.getItem('cart');
    this.list = JSON.parse(local_storage || []); 
    this.tTong = this.list.reduce((sum:any, x:any) => sum + x.gia * x.quantity, 0);
    console.log(this.list);
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/hide_menu.js');
  }
  public Giam(maSanPham: any) {
    var index = this.list.findIndex((x: any) => x.maSanPham == maSanPham);
    if (index >= 0 && this.list[index].quantity >= 1) {
      this.list[index].quantity -= 1;
      this.tTong = this.list.reduce((sum:any, x:any) => sum + x.gia * x.quantity, 0);
    }
  }
  public Tang(maSanPham: any) {
    var index = this.list.findIndex((x: any) => x.maSanPham == maSanPham);
    if (index >= 0) {
      this.list[index].quantity += 1;
      this.tTong = this.list.reduce((sum:any, x:any) => sum + x.gia * x.quantity, 0);
    }
  }
  public XoaCart() {
    if (confirm("Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng!")) {
        localStorage.setItem('cart','');
        this.list = null;
        this.tTong = 0;
    }
  }
  public updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.list));
    alert("Đã cập nhật thông tin giỏ hàng thành công!");
  }
  public Xoa(maSanPham: any) {
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng!")) {
      var index = this.list.findIndex((x: any) => x.maSanPham == maSanPham);
      if (index >= 0) {
        this.list.splice(index, 1);
        this.tTong = this.list.reduce((sum:any, x:any) => sum + x.gia * x.quantity, 0);
      }
    }
    localStorage.clear();
  }
}
