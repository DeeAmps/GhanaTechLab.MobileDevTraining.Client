import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { sha256 } from 'js-sha256';
import { ApiCallsService } from '../services/api-calls.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';





@Component({
  selector: 'app-register3',
  templateUrl: './register3.component.html',
  styleUrls: ['./register3.component.css']
})
export class Register3Component implements OnInit {
  employed = false;
  motivation: any;
  internOpportunity = false;
  commit = false;
  heardBy: any;
  fullparticipation = false;
  enrolled = false;
  currentRole: any;

  constructor(private router: Router, private api: ApiCallsService, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    if (localStorage.getItem('EDUCATION_SKILLS') == undefined || localStorage.getItem('EDUCATION_SKILLS') == null) {
      this.router.navigate(['2']);
    } else {
      const obj =  JSON.parse(localStorage.getItem('EDUCATION_SKILLS'));
      const sh = obj.sha;
      delete obj.sha;
      if (sh != sha256(JSON.stringify(obj))) {
        this.router.navigate(['2']);
      }
    }
  }

  changeEmployment() {
    this.employed = !this.employed;
  }

  internshipOpportunity() {
    this.internOpportunity = !this.internOpportunity;
  }

  readyToCommit() {
    this.commit = !this.commit;
  }

  heardThrough(val) {
    this.heardBy = val;
  }

  fullParticipation() {
    this.fullparticipation = !this.fullparticipation;
  }

  enrolledCheck() {
    this.enrolled = !this.enrolled;
  }

  GoBack() {
    this.router.navigate(['2']);
  }


  checkInput(val) {
    if (val === undefined || val === '') {
      return true;
    }
    return false;
  }

  Submit() {
    if (!this.checkInput(this.motivation)) {
      return Swal.fire({
        title: '',
        text: 'Please share your motivation with us!',
        type: 'error',
        confirmButtonText: 'OK'
      });
    }
    if (this.employed && !this.checkInput(this.currentRole)) {
      return Swal.fire({
        title: '',
        text: 'Please tell us your current Job Role!',
        type: 'error',
        confirmButtonText: 'OK'
      });
    }
    const personalInfo = localStorage.getItem('PERSONAL_INFO');
    const eduSkills = localStorage.getItem('EDUCATION_SKILLS');
    const other: any = {
      employed: this.employed,
      enrolled: this.enrolled,
      currentRole: this.currentRole,
      commit: this.commit,
      internOpportunity: this.internOpportunity,
      fullparticipation: this.fullparticipation,
      heardAboutUsThrough: this.heardBy,
      motivation: this.motivation,
    };
    const data = {
      personalInfo: JSON.parse(personalInfo),
      eduSkills : JSON.parse(eduSkills),
      other
    };
    this.ngxService.start();
    this.api.postApplication(data).subscribe( ret => {
      const dt: any = ret;
      if (dt.success) {
        localStorage.removeItem('PERSONAL_INFO');
        localStorage.removeItem('EDUCATION_SKILLS');
        this.employed = false
        this.enrolled = false;
        this.commit = false;
        this.heardBy = undefined;
        this.internOpportunity = false;
        this.fullparticipation = false;
        this.motivation = undefined;
        this.ngxService.stop();
        return Swal.fire({
          title: 'Application Sent',
          text: 'Your application will be reviewed. Best of Luck',
          type: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        return Swal.fire({
          title: 'Error Sending Application',
          text: 'Please Try Again!',
          type: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }


}
