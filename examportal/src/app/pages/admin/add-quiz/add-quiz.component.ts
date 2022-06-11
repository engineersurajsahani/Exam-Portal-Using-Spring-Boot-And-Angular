import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quiz={
    title:"",
    description:"",
    maxMarks:"",
    numberOfQuestions:"",
    active:true,
    category:{
      cid:""
    }

  }

  categories=[
    {
      cid:1,
      title:"Programming",
      description:"This is description of category"
    },
    {
      cid:2,
      title:"Programming",
      description:"This is description of category"
    },


  ]

  constructor(
    private quizService:QuizService,
    private category:CategoryService,
    private _snackBar:MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);

      },
      (error:any)=>{
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:3000,
      verticalPosition:'bottom',
      horizontalPosition:'center'
    });
  }

  onSubmit(){



    if(this.quiz.title=="" || this.quiz.title==null){
      this.openSnackBar("Title is required","OK")
      return;
    }
    if(this.quiz.description=="" || this.quiz.description==null){
      this.openSnackBar("Description is required","OK")
      return;
    }
    if(this.quiz.maxMarks=="" || this.quiz.maxMarks==null){
      this.openSnackBar("Maximum marks is required","OK")
      return;
    }
    if(this.quiz.numberOfQuestions=="" || this.quiz.numberOfQuestions==null){
      this.openSnackBar("Number of questions is required","OK")
      return;
    }
    console.log(this.quiz);
    this.quizService.addQuiz(this.quiz).subscribe(
      (data:any)=>{
        //success

        this.quiz.title="";
        this.quiz.description="";
        this.quiz.maxMarks="";
        this.quiz.numberOfQuestions="";
        this.quiz.active=false;
        this.quiz.category.cid="";
        Swal.fire({
          icon: 'success',
          title: 'Good Job',
          text: 'Quiz is Successfully Added!!',
          footer: '<a>Created Suraj Sahani</a>'
        }).then((result)=>{
          this.router.navigate(['/admin/quizzes'])
        })



      },
      (error:any)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! while adding new quiz',
          footer: '<a>Created Suraj Sahani</a>'
        })


      }
    )
  }



}
