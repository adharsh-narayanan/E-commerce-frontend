import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../service/datashare.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

  product:any={}

  constructor(private api:DatashareService,private router:ActivatedRoute){
  } //ActivatedRoute is for getting path parameter

  ngOnInit(): void {
    this.router.params.subscribe((res:any)=>{
      const id=res.id
      console.log(id);
      this.getProduct(id)
      
    })
    
  }

  getProduct(id:any){
    this.api.viewProductApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.product=res
        
      },
      error:(error:any)=>{
        console.log(error);
        
      }

    })

  }

  //add to wishlist
  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){

      this.api.addTOWishlistApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getWishlistCount()
          alert('product added to wishlist')          
        },
        error:(error:any)=>{
          alert(error.error)
        }
      })

    }else{
      alert('please login')
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


