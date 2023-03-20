import { HttpParams } from '@angular/common/http';
import { OfferService } from './../../_services/Offer/offer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

   offerImage!:File;

  addOffer={
    name: "",
    offercode: "",
    flag: false,
    imageUrl: "",
    status: ""
  }

  offerForm!:FormGroup;

  constructor(
    private offerService:OfferService,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.offerForm = this.formBuilder.group({
      name: ['', Validators.required],
      offercode: ['', Validators.required],
      flag: ['', Validators.required],
      imageUrl: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  addNewOffer(){
    const imageData = new FormData();
    imageData.append('image', this.offerImage);
    if(this.offerForm.valid){
      const param = new HttpParams()
        .set('offerName', this.offerForm.value.name)
        .set('offerCode', this.offerForm.value.offercode)
        .set('flag', this.offerForm.value.flag)
        .set('status', this.offerForm.value.status);
      this.offerService.addNewOfferService(imageData,param).subscribe({
        next:(res)=>{
          this.offerForm.reset();
          alert('Offer Added Sucessfully'),
          console.log(res);
        },
        error:(res)=>{
          alert('Something went Wrong Offer not Added'), console.log(res);
          console.log(res);
        }
      });
    }
  }

  onFileUpload(event:any) {
    this.offerImage = event.target.files[0];
  }

}
