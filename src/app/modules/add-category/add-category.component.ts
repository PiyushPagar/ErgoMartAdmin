import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from './../../_services/Category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


  addCategory={
    title: "",
    metatitle: "",
    content: ""
  }


  categoryForm!:FormGroup;

  constructor(
    private categoryService:CategoryService,
    private dialog: MatDialog,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      metadata: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  addNewCategory(){
      if(this.categoryForm.valid){
        this.categoryService.addNewCategoryService(this.addCategory).subscribe({
          next:(res)=>{
            this.categoryForm.reset();
            alert('Category Added Sucessfully'), console.log(res);
            console.log(res);
          },
          error:(res)=>{
            alert('Something went Wrong Category not Added'), console.log(res);
            console.log(res);
          }
        });
      }
  }




}
