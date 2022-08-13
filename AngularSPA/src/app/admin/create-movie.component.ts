import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { passwordValidatorService } from '../core/CustomValidators/passwordValidator.validator';


@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  createMovieForm!:FormGroup;
  submitted:boolean = false;

  constructor(private fb:FormBuilder, private pwValidator:passwordValidatorService) { }

  ngOnInit(): void {
    this.createMovieForm = this.fb.group({
      Title: ['', Validators.required],
      Overview: ['', Validators.required],
      Tagline: ['', Validators.required],
      Budget: [''],
      Revenue: [''],
      ImdbUrl: ['', Validators.required],
      TmdbUrl: ['', Validators.required],
      PosterUrl: ['', Validators.required],
      BackdropUrl: ['', Validators.required],
      OriginalLanguage: ['', Validators.required],
      ReleaseDate: [Date.now, Validators.required],
      RunTime: [''],
      Price: ['']
    },
    {
      Validator: this.pwValidator.MatchPassword('Title', 'Overview')
    }
    );
  }

  onSubmit(){
    this.submitted = true;
    if (this.createMovieForm.valid){
      alert('Form Submitted Successfully!! \n Check the values in browser console');
      console.table(this.createMovieForm.value);
    }
  }

}
