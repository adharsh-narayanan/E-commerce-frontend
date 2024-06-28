import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../service/datashare.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  products:any=[]
  constructor(private api:DatashareService){}
  ngOnInit(): void {
    this.getWishlistItems()
  }
  getWishlistItems(){
      
    this.api.getWishlistsApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.products=res
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }

  //to remove item from wishlist

  removeItem(id:any){
    this.api.deletefromWishlist(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getWishlistCount()
        this.getWishlistItems()
        
      },
      error:(error:any)=>{
        console.log(error);
        
      },

    })
  }

  //add to cart

  addToCart(product:any){
    console.log(product);
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1}) //adding quantity key to the object
      this.api.addToCartApi(product).subscribe({

        next:(res:any)=>{
          console.log(res);
          this.api.getCartCount()
          alert('product added to cart succesfuly ')
          this.removeItem(product._id)
        },
        error:(error:any)=>{
          console.log(error);      
          alert('something went wrong')    
          
        }

      })
    }else{
      alert('Please login')
    }

    

  }


}
