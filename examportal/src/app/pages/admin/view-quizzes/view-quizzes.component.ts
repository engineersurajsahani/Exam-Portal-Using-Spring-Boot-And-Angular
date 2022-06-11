import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any=[];

  constructor(private quiz:QuizService) { }

  ngOnInit(): void {
    this.quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);

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

  deleteQuiz(qId:any){

    Swal.fire({
      icon:"info",
      title:"Are You Sure ?",
      confirmButtonText:"Delete",
      showCancelButton:true,

    }).then((result)=>{
      if(result.isConfirmed){
        alert(qId);
        this.quiz.deleteQuiz(qId).subscribe(
          (data)=>{
            this.quizzes=    this.quizzes.filter((quiz:any)=>quiz.qid!=qId);
            Swal.fire({
              icon: 'success',
              title: 'Good Job',
              text: 'Quiz is Successfully Deleted!!',
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
