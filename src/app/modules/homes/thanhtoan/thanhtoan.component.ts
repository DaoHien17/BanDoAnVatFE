import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { CartService } from 'src/app/core/services/cart.service';
import { SendService } from 'src/app/core/services/send.service';
import { ApiService } from './../../../core/services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-thanhtoan',
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css']
})
export class ThanhtoanComponent extends BaseComponent implements OnInit {
  public frmKhach: any;
  public list_items: any;
  public tTong: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    const local_storage : any = localStorage.getItem('cart');
    this.list_items = JSON.parse(local_storage || []);
    this.tTong = this.list_items.reduce((sum:any, x:any) => sum + x.Gia * x.quantity, 0);
    console.log(this.list_items);

    this.frmKhach = new FormGroup({
      'txt_hoten': new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
      'txt_sdt': new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'txt_email': new FormControl('',[Validators.required]),
      'txt_diachi': new FormControl('',[Validators.required]),
      'txt_ghichu': new FormControl('')
    });
  }
  get hoten() {
    return this.frmKhach.get('txt_hoten')!;
  }
  get sodienthoai() {
    return this.frmKhach.get('txt_sdt')!;
  }
  get email() {
    return this.frmKhach.get('txt_email')!;
  }
  get diachi() {
    return this.frmKhach.get('txt_diachi')!;
  }
  public onSubmit(val:any) {
    if(this.frmKhach.invalid) {
      return;
    }


    let obj:any = {};
    obj.khach =  {
      TenKhachHang:val.txt_hoten,
      DiaChi:val.txt_diachi,
      SoDienThoai:val.txt_sdt,
      Email:val.txt_email
    };
    obj.donhang = [];
    this.list_items.forEach((x:any) => {
      obj.donhang.push({
        MaSanPham: x.MaSanPham,
        SoLuong:x.quantity,
        GiaMua:x.Gia,
        TenSP:x.TenSanPham,
        Anh:x.AnhDaiDien,
      });
    });

    const mail: FormData = new FormData();
    mail.append('ToEmail', obj.khach.Email);
    mail.append('Subject', "Thông báo đặt hàng thành công");
    mail.append('Body', "Bạn đã đặt thành công đơn hàng!");
    mail.append('Attachments', "");
    // console.log(mail);
    // debugger;
    alert("Đã đặt hàng thành công!");
    console.log(obj);
     this._api.post('/api/Customer/addcart', obj).subscribe(res => {

    });
    localStorage.clear();

  }

}
