import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  categories:any=[]


  constructor(
    private quizService:QuizService,
    private category:CategoryService,
    private _snackBar:MatSnackBar,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  qId=0;
  quiz: any={};


  ngOnInit(): void {


   this.qId= this.route.snapshot.params['qid'];


   this.quizService.getQuiz(this.qId).subscribe(
     (data)=>{
       this.quiz=data;
       console.log(this.quiz)


     },
     (error)=>{
      console.log(error);



     }
   )

   this.category.categories().subscribe(
    (data:any)=>{
      this.categories=data;
      console.log(this.categories);

    },
    (error:any)=>{
      console.log(error);



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
    this.quizService.updateQuiz(this.quiz).subscribe(
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
          text: 'Quiz is Successfully Updated!!',
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
          text: 'Something went wrong! while updating quiz',
          footer: '<a>Created Suraj Sahani</a>'
        })


      }
    )
  }





}
