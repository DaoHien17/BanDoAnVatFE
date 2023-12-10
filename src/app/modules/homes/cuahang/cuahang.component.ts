import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-cuahang',
  templateUrl: './cuahang.component.html',
  styleUrls: ['./cuahang.component.css']
})
export class CuahangComponent extends BaseComponent implements OnInit, AfterViewInit{

  constructor( injector: Injector) {
    super(injector);
   }

  ngOnInit(): void {
  }
  ngAfterViewInit() { 
    this.loadScripts('assets/js/hide_menu.js'); 
   }
}
