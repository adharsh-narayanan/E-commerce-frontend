import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../service/datashare.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginUsername:string=""
  wishlistcount:number=0
  cartCount:number=0
  constructor(private api:DatashareService){}

  ngOnInit(): void {
    if(sessionStorage.getItem('username')){
      this.loginUsername=sessionStorage.getItem('username') || ""

      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishlistcount=res
      })

      this.api.cartCount.subscribe((res:any)=>{
        this.cartCount=res

      })

    }else{
      this.loginUsername=""
    }
  }

}
