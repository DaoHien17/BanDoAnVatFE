import { ApiService } from './../../../core/services/api.service';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';


@Component({
  selector: 'app-sploai',
  templateUrl: './sploai.component.html',
  styleUrls: ['./sploai.component.css']
})
export class SpLoaiComponent extends BaseComponent implements OnInit,AfterViewInit {
  public list_item:any;
  public sp_moi: any;
  public originListItems: any;
  public loaisp:any;
  products:any[]=[];
  subtotal:any;
  page: number=1;
  count:number=0;
  tableSize:number=8;
  tableSizes:any=[20,30,40,50]

  constructor( injector: Injector ) {
    super(injector);

   }

  onSlideChange() {
    console.log('slide change');
  }
  onTableDataChange(event:any){
    this.page = event;
    // this.getAllProducts();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/Home/GetSPtheoLoai/'+id).subscribe(res => {
      this.list_item = res;
      console.log(res);

      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' );
      });
    });
    });
  }

  ngAfterViewInit() {
    //this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' );
  }

}

