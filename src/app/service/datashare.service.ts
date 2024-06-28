import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  
  serverUrl = "https://e-commerce-server-0lpa.onrender.com"

    //beahaviourSubject to load data to header 

    wishlistCount=new BehaviorSubject(0)
    cartCount=new BehaviorSubject(0)

  constructor(private http: HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()

    }
   }

  //api to get all products

  getAllProductApi() {
    return this.http.get(`${this.serverUrl}/all-products`)
  }

  //api to register user

  registerApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/user/register`, reqBody)
  }

  //api to login user

  loginApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/user/login`, reqBody)
  }

  
//to get token and to create headers  
  addTokentoHeader() {

    //object for HttpHeaders

    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if (token) {
      //append used to add data to object
      headers = headers.append('Authorization', `Bearer ${token}`) //return an object with key has headers and value has headers
    }
    return { headers }

  }



//api to add product to wishlist
  addTOWishlistApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/user/wishlist`, reqBody, this.addTokentoHeader())
  }


  //api to view job in full screen get

  viewProductApi(id:any){
    return this.http.get(`${this.serverUrl}/view-product/${id}`)
  }

  //api to get all wishlists items
  getWishlistsApi(){
    return this.http.get(`${this.serverUrl}/wishlist/products`,this.addTokentoHeader())
  }

  //to delete from wishlist

  deletefromWishlist(id:any){
    return this.http.delete(`${this.serverUrl}/wishlist/remove-item/${id}`,this.addTokentoHeader())

  }

  //to get wishlist count

  getWishlistCount(){
    this.getWishlistsApi().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  //to add to cart

  addToCartApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/user/cart`, reqBody, this.addTokentoHeader())


  }

  //to get items from cart

  getFromCartApi=()=>{
    return this.http.get(`${this.serverUrl}/cart/products`,this.addTokentoHeader())
  }


  //to remove from cart

  removeFromCartApi=(id:any)=>{
    return this.http.delete(`${this.serverUrl}/cart/remove-item/${id}`,this.addTokentoHeader())
  }

  //to empty cart

  emptyCartApi=()=>{
    return this.http.delete(`${this.serverUrl}/cart/empty-cart`,this.addTokentoHeader())
  }

  //to get cart count

  getCartCount(){
    this.getFromCartApi().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })

  }

  // to increment cart item quantity

  incrementCartItemApi(id:any){
    return this.http.get(`${this.serverUrl}/cart/increment/${id}`,this.addTokentoHeader())

  }


  // to decrement cart item quantity

  decrementCartItemApi(id:any){
    return this.http.get(`${this.serverUrl}/cart/decrement/${id}`,this.addTokentoHeader())

  }




}


