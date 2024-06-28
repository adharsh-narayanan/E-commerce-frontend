import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  {
  grandTotal:any=""
  proceedtoPaymentstatus:boolean=false
  paymentStatus:boolean=false

  //paypal
  public payPalConfig ? : IPayPalConfig;



  constructor(private fb: FormBuilder) { }  //model driven data binding

  checkoutForm = this.fb.group({
    uname: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    flat: ["", [Validators.required, Validators.pattern('[a-zA-z0-9- ]*')]],
    place: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    pincode: ["", [Validators.required, Validators.pattern('[0-9]*')]]


  })



  //cancel address form
  cancel(){
    this.checkoutForm.reset()
  }

  //to payment

  proceedToPay(){
    if(this.checkoutForm.valid){
      this.grandTotal=sessionStorage.getItem("total")
      this.proceedtoPaymentstatus=true
    }
    else{
      alert('please fill the address completely')
    }

  }

//back button 
back(){
  this.proceedtoPaymentstatus=false
}
  //to make payment

payment(){
  this.initConfig()
  this.paymentStatus=true
}
  // pay pal integration

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            /* this.showSuccess = true; */
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
/*             this.showCancel = true;
 */
        },
        onError: err => {
            console.log('OnError', err);
/*             this.showError = true;
 */        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
/*             this.resetStatus();
 */        }
    };
}

}
