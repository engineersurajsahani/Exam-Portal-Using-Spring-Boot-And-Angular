import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;
  marksGot=0;
  correctAnswer=0;
  attempted=0;

  isSubmit=false;

  timer:any;


  constructor(
    private locationStrategy:LocationStrategy,
    private route:ActivatedRoute,
    private questionService:QuestionService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this.route.snapshot.params['qid']
    this.loadQuestions();


  }

  preventBackButton(){
    history.pushState(null,'',location.href);
    this.locationStrategy.onPopState(()=>{

      history.pushState(null,'',location.href);

    });
  }

  public loadQuestions(){
    this.questionService.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data)=>{

        this.questions=data;

        //seconds in timer
        this.timer=this.questions.length*2*60;


        this.startTimer();




      },
      (error)=>{
        console.log(error);

      }
    )
  }

  public submitQuiz(){
    Swal.fire({
      icon:"info",
      title:"Do you want to submit the Quiz ?",
      confirmButtonText:"Submit",
      showCancelButton:true,

    }).then((result)=>{
      if(result.isConfirmed){

        this.evalQuiz();

      }

    });
  }


  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
       this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }

    },1000)
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`
  }

  evalQuiz(){

    this.questionService.evalQuiz(this.questions).subscribe(
      (data:any)=>{

        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer=data.correctAnswer;
        this.attempted=data.attempted;
        this.isSubmit=true;


      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Currently we are unable to evaluate your marks.',
          footer: '<a>Created Suraj Sahani</a>'
        })

      }

    )

    // this.isSubmit=true;

    // this.questions.forEach((q:any)=>{
    //   if(q.givenAnswer==q.answer){
    //     this.correctAnswer++;
    //     let singleMarks=this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot+=singleMarks;
    //   }
    //   if(q.givenAnswer.trim()!=''){
    //     this.attempted++;
    //   }

    // });



  }


  printPage(){
    window.print();
  }

}
