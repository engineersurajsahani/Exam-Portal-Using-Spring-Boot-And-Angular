import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private userService:UserService,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  public user={
    username: "",
    password: "",

    firstName: "",
    lastName: "",
    email:"",
    phone:"",

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:3000,
      verticalPosition:'bottom',
      horizontalPosition:'center'
    });
  }

  onSubmit(){



    if(this.user.username=="" || this.user.username==null){
      this.openSnackBar("Username is required","OK")
      return;
    }
    if(this.user.firstName=="" || this.user.firstName==null){
      this.openSnackBar("FirstName is required","OK")
      return;
    }
    if(this.user.lastName=="" || this.user.lastName==null){
      this.openSnackBar("LastName is required","OK")
      return;
    }
    if(this.user.email=="" || this.user.email==null || this.user.email.endsWith("@gmail.com",0)){
      this.openSnackBar("Please Enter Valid Email","OK")
      return;
    }
    if(this.user.phone=="" || this.user.phone==null){
      this.openSnackBar("Phone is required","OK")
      return;
    }
    if(this.user.password=="" || this.user.password==null){
      this.openSnackBar("Password is required","OK")
      return;
    }

    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Good Job',
          text: 'Registration is seucessfull!!',
          footer: '<a>Created Suraj Sahani</a>'
        })

      },
      (error)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a>Created Suraj Sahani</a>'
        })


      }
    )
  }

}
