import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../service/datashare.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any=[]
  total:any=0
  constructor(private api:DatashareService){}
  ngOnInit(): void {
    this.getCartItems()
    
  }
//to get cart items
 getCartItems(){
  this.api.getFromCartApi().subscribe({
    next:(res:any)=>{
      console.log(res);
      this.products=res
      this.getTotal()
      
    },
    error:(error:any)=>{
      console.log(error);
      
    }
  })

  }

  //to remove product from cart

  removeCartItem(id:any){
    this.api.removeFromCartApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getCartCount()
        this.getCartItems()
      },
      error:(error:any)=>{
        console.log(error);

        console.log('something went wrong');
        
      }
    })
  }


  //to empty cart

  emptyCart(){
    this.api.emptyCartApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getCartCount()
        this.getCartItems()

      },
      error:(error:any)=>{
        console.log(error);
        
        alert('something went wrong');
        
      }
    })
  }

  //to increment product quantity

  incrementProduct(id:any){
    this.api.incrementCartItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getCartCount()
        this.getCartItems()
      },
      error:(error:any)=>{
        console.log(error);        
      }
    })

  }

  //to decrement product quantity

  decrementProduct(id:any){
    this.api.decrementCartItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getCartCount()
        this.getCartItems()
      },
      error:(error:any)=>{
        console.log(error);        
      }
    })

  }

  getTotal(){
    this.total= Math.ceil(this.products.map((item:any)=>item.grandTotal).reduce((a:any,b:any)=>a+b))
    console.log(this.total);
    

  }

  //to store total

  checkOut(){
    sessionStorage.setItem("total",JSON.stringify(this.total))
  }


}
