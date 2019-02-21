import { Injectable } from '@angular/core';
import { FormControl , FormGroup , Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";


@Injectable({
 providedIn: 'root'
})
export class CustomerService {

 constructor(private firebase: AngularFireDatabase) { }
         customerList: AngularFireList<any>;
 form = new FormGroup({
     $key: new FormControl(null),
     fullName: new FormControl('',Validators.required),
     email: new FormControl('', Validators.email),
     address: new FormControl('', Validators.required),
     location: new FormControl('', Validators.required)
         });
 getCustomers(){
                 this.customerList = this.firebase.list('customers');
                 return this.customerList.snapshotChanges();
         }

         insertCustomer(customer){
                 this.customerList.push({
                         fullName: customer.fullName,
                         email: customer.email,
                         address: customer.address,
                         location:customer.location
                  });
         }
         populateForm(customer){
    this.form.setValue(customer);
  }
  updateCustomer(customer){
    this.customerList.update(customer.$key,{
       fullName: customer.fullName,
        email: customer.email,
        address: customer.address,
        location:customer.location
    });
  }

  deleteCustomer($key: string){
    this.customerList.remove($key);
  }
}
