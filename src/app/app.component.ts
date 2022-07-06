import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { EmailService } from './services/email.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  title = 'proba';

  simForm: FormGroup;


   observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const diagramm = entry.target.querySelector('.diagramm');
      
      if(entry.isIntersecting) {
        diagramm!.classList.add('diagramm-animation');
        return;
      }

      diagramm!.classList.remove('diagramm-animation');

    });
  });

  constructor(private fb: FormBuilder, private emailService: EmailService){
    this.simForm=this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['Standard', Validators.required],
      //image: ['', Validators.required]
    })
  }

  ngOnInit() : void {
  

    this.observer.observe(document.querySelector('.animation')!);
  
  }

  menuVariable:boolean = false;

  openMenu(){
    this.menuVariable =! this.menuVariable;
  }

  toSection1(){
    document.getElementById("section1")?.scrollIntoView({behavior: "smooth"});
  }

  toSection2(){
    document.getElementById("section2")?.scrollIntoView({behavior: "smooth"});
  }

  toSection3(){
    document.getElementById("section3")?.scrollIntoView({behavior: "smooth"});
  }

  toSIM(){
    document.getElementById("SIM")?.scrollIntoView({behavior: "smooth"});
  }

  toStart(){
    document.getElementById("hero")?.scrollIntoView({behavior: "smooth"});
  }

  submitData(){
    if(this.simForm.get('name') && this.simForm.get('email') && this.simForm.get('type')){
      this.emailService.create(this.simForm.value).then(_ => {
      }).catch(error => {
        console.log(error);
      });
    }

  }


}
