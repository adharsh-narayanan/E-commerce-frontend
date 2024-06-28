import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../service/datashare.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allproducts:any=[]
  constructor(private api: DatashareService) { }
  ngOnInit(): void {
    this.api.getAllProductApi().subscribe({
      next: (res: any) => {
        this.allproducts=res
        console.log(this.allproducts);
        

      },
      error: (err: any) => {
        console.log(err);

      }
    })

  }

  //add to wishlist
  addtoWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addTOWishlistApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('product added succesfuly to wishlist')
          this.api.getWishlistCount()
        },
        error:(error:any)=>{
          console.log(error);      
          alert(error.error)    
          
        }
      })

    }else{
      alert('please login to add product to wishlist')
    }

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
