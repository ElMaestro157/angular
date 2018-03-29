import { AuthorsService } from './authors/authors-service/authors.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { dateValidator } from './date';
import { durationValidator } from './duration';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {

  formGroup: FormGroup;
  authors: string[];

  constructor(private formBuilder: FormBuilder, public authorsServ: AuthorsService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.maxLength(50), Validators.required]],
      description: ['', [Validators.maxLength(500), Validators.required]],
      date: new FormControl('', [dateValidator, Validators.required]),
      duration: new FormControl('', [durationValidator, Validators.required, Validators.maxLength(3)]),
      authors: new FormControl([], [Validators.required])
    });
  }

  save() {

  }

}
