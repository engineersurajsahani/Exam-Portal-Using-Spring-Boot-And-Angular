import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private loginService:LoginService,
    private _snackBar:MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  public user={
    username: "",
    password: "",

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition:'center'
    });
  }

  onSubmit(){



    if(this.user.username=="" || this.user.username==null){
      this.openSnackBar("Username is required","OK")
      return;
    }
    if(this.user.password=="" || this.user.password==null){
      this.openSnackBar("Password is required","OK")
      return;
    }
    console.log(this.user);
    this.loginService.generateToken(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);

        //login
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{

            this.loginService.setUser(user);
            console.log(user);

            //redirect  ...ADMIN : admin-dashboard
            //redirect  ...NORMAL : normal-dashboard

            if(this.loginService.getUserRole()=="ADMIN"){
              //window.location.href='/admin';
              this.router.navigate(['admin'])
              this.loginService.loginStatusSubject.next(true)

            }
            else if(this.loginService.getUserRole()=="NORMAL"){
              //window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0'])
              this.loginService.loginStatusSubject.next(true)


            }
            else{
              this.loginService.logout();

            }


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
