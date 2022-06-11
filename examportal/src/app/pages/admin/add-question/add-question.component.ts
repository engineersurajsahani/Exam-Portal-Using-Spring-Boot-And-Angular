import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {


  qId:any;
  qTitle:any;

   ngOnInit(): void {
    this.qId=  this.route.snapshot.params['qid'];
    this.qTitle=  this.route.snapshot.params['title'];
    this.question.quiz.qid=this.qId;
  }
  question:any={
    quiz:{
      qid:""


    },
    content:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    answer:"",
  }
  constructor(

    private questionService:QuestionService,
    private _snackBar:MatSnackBar,
    private router:Router,
    private route:ActivatedRoute
  ) { }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:3000,
      verticalPosition:'bottom',
      horizontalPosition:'center'
    });
  }

  onSubmit(){



    if(this.question.content=="" || this.question.content==null){
      this.openSnackBar("Content is required","OK")
      return;
    }
    if(this.question.option1=="" || this.question.option1==null){
      this.openSnackBar("Option 1 is required","OK")
      return;
    }
    if(this.question.option2=="" || this.question.option2==null){
      this.openSnackBar("Option 2 is required","OK")
      return;
    }
    if(this.question.option3=="" || this.question.option3==null){
      this.openSnackBar("Option 3 is required","OK")
      return;
    }
    if(this.question.option4=="" || this.question.option4==null){
      this.openSnackBar("Option 4 is required","OK")
      return;
    }
    if(this.question.answer=="" || this.question.answer==null){
      this.openSnackBar("Answer is required","OK")
      return;
    }



    console.log(this.question);
    this.questionService.addQuestion(this.question).subscribe(
      (data:any)=>{
        //success

        this.question.content="";
        this.question.option1="";
        this.question.option2="";
        this.question.option3="";
        this.question.option4="";
        this.question.answer="";

        Swal.fire({
          icon: 'success',
          title: 'Good Job',
          text: 'Question is Successfully Added!!',
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
          text: 'Something went wrong! while adding new question',
          footer: '<a>Created Suraj Sahani</a>'
        })


      }
    )
  }


}
