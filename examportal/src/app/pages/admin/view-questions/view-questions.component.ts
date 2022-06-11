import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any=[]


  constructor(
    private quizService:QuizService,
    private questionService:QuestionService,
    private _snackBar:MatSnackBar,
    private router:Router,
    private route:ActivatedRoute
  ) { }


  ngOnInit(): void {
  this.qId=  this.route.snapshot.params['qid'];
  this.qTitle=  this.route.snapshot.params['title'];

  this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
    (data:any)=>{

      this.questions=data;

    },
    (error)=>{
      console.log(error);

    }

  )
  }


  deleteQuestion(qId:any){


    Swal.fire({
      icon:"info",
      title:"Are You Sure ?",
      confirmButtonText:"Delete",
      showCancelButton:true,

    }).then((result)=>{
      if(result.isConfirmed){

        this.questionService.deleteQuestion(qId).subscribe(
          (data)=>{
            this.questions=    this.questions.filter((quiz:any)=>quiz.quesId!=qId);
            Swal.fire({
              icon: 'success',
              title: 'Good Job',
              text: 'Question is Successfully Deleted!!',
              footer: '<a>Created Suraj Sahani</a>'
            })

          },
          (error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a>Created Suraj Sahani</a>'
            })

          }
        )

      }

    });


  }


}
