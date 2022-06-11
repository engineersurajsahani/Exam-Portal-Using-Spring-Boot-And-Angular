import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


  category={
    title:"",
    description:""
  }

  constructor(
    private categoryService:CategoryService,
    private _snackBar:MatSnackBar,
    private router:Router
  ) { }


  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:3000,
      verticalPosition:'bottom',
      horizontalPosition:'center'
    });
  }

  onSubmit(){



    if(this.category.title=="" || this.category.title==null){
      this.openSnackBar("Title is required","OK")
      return;
    }
    if(this.category.description=="" || this.category.description==null){
      this.openSnackBar("Description is required","OK")
      return;
    }
    console.log(this.category);
    this.categoryService.addCategory(this.category).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        this.category.title="";
        this.category.description="";
        Swal.fire({
          icon: 'success',
          title: 'Good Job',
          text: 'Category is Successfully Added!!',
          footer: '<a>Created Suraj Sahani</a>'
        })



      },
      (error:any)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! while adding new category',
          footer: '<a>Created Suraj Sahani</a>'
        })


      }
    )
  }



}
