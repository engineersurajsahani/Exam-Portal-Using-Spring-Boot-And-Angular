import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid:any;
  quiz:any={

  }

  constructor(
    private route:ActivatedRoute,
    private quizService:QuizService,
    private router:Router,
  ) { }

  ngOnInit(): void {
   this.qid= this.route.snapshot.params['qid'];


   this.quizService.getQuiz(this.qid).subscribe(
     (data)=>{

       this.quiz=data;

     },
     (error)=>{

     }
   )
  }

  startQuiz(){

    Swal.fire({
      icon:"info",
      title:"Do you want to start the Quiz ?",
      confirmButtonText:"Start",
      showCancelButton:true,

    }).then((result)=>{
      if(result.isConfirmed){

        this.router.navigate(['/start/'+this.qid])

      }

    });


  }


}
