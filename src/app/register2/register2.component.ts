import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../services/api-calls.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { sha256 } from 'js-sha256';



@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})
export class Register2Component implements OnInit {
  educationalLevels: any;
  instituitions: any;

  instituition: any;
  educationLevel: any;
  courseStudied: any;
  languages: any;
  programmingRate = 0;
  entrepreneurial =  false;
  programmingKnowledge = false;
  constructor(private api: ApiCallsService, private ngxService: NgxUiLoaderService,  private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('PERSONAL_INFO') == undefined || localStorage.getItem('PERSONAL_INFO') == null) {
      this.router.navigate(['']);
    } else {
      const obj =  JSON.parse(localStorage.getItem('PERSONAL_INFO'));
      const sh = obj.sha;
      delete obj.sha;
      if (sh != sha256(JSON.stringify(obj))) {
        this.router.navigate(['']);
      } else  if (localStorage.getItem('EDUCATION_SKILLS') != undefined || localStorage.getItem('EDUCATION_SKILLS') != null) {
        const getObj = JSON.parse(localStorage.getItem('EDUCATION_SKILLS'));
        this.programmingKnowledge = getObj.programmingKnowledge;
        this.instituition = getObj.instituition;
        this.courseStudied = getObj.course;
        this.educationLevel = getObj.educationLevel;
        this.entrepreneurial = getObj.entrepreneurial;
        this.languages = getObj.languages;
        this.programmingRate = getObj.programmingRate;
      }
    }
    this.ngxService.start();
    this.api.getEducationLevels().subscribe( data => {
      this.educationalLevels = data;
      this.api.getInstituitions().subscribe( idata => {
        this.instituitions = idata;
        this.ngxService.stop();
      });
    });
  }

  changeProgrammingKnowledge() {
    this.programmingKnowledge = !this.programmingKnowledge;
  }

  setInstituitionLevel(level) {
    this.instituition = level;
  }

  setEducationLevel(level) {
    this.educationLevel = level;
  }

  entrepreneurialTraining() {
    this.entrepreneurial = !this.entrepreneurial;
  }

  checkInput(val) {
    if (val === undefined || val === '') {
      return true;
    }
    return false;
  }


  GoToNext() {
    localStorage.removeItem('EDUCATION_SKILLS');
    if (this.checkInput(this.instituition) || this.checkInput(this.educationLevel) || this.checkInput(this.courseStudied)) {
      return Swal.fire({
        title: '',
        text: 'Please fill all required forms',
        type: 'error',
        confirmButtonText: 'OK'
      });
    } else if (this.programmingKnowledge === true && this.checkInput(this.languages)) {
      return Swal.fire({
        title: '',
        text: 'Please tell us which programming languages you know!',
        type: 'error',
        confirmButtonText: 'OK'
      });
    } else if (this.programmingKnowledge === true && this.programmingRate == 0 ) {
      return Swal.fire({
        title: '',
        text: 'Please rate your programming knowledge!',
        type: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      const educationAndSkills: any = {
        programmingKnowledge : this.programmingKnowledge,
        instituition: this.instituition,
        course: this.courseStudied,
        educationLevel: this.educationLevel,
        entrepreneurial: this.entrepreneurial,
        languages : this.languages,
        programmingRate: this.programmingRate
      };
      console.log(educationAndSkills);
      const sha = sha256(JSON.stringify(educationAndSkills));
      educationAndSkills.sha = sha;
      localStorage.setItem('EDUCATION_SKILLS', JSON.stringify(educationAndSkills));
      this.router.navigate(['3']);
    }
  }

  GoBack() {
    this.router.navigate(['']);
  }

}
