import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../services/api-calls.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { sha256 } from 'js-sha256';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  nationalIdsData: any;
  regions: any;
  region: any
  fullname: any;
  email: any;
  phone: any;
  location: any;
  dob: any;
  id: any;
  idtype: any;
  gender: any;

  constructor(private api: ApiCallsService, private ngxService: NgxUiLoaderService,  private router: Router) { }

  ngOnInit() {
    this.ngxService.start();
    this.api.getNationalIDs().subscribe(n => {
      this.nationalIdsData = n;
      this.api.getRegions().subscribe(r => {
        this.regions = r;
        this.ngxService.stop();
      });

    });
    if (localStorage.getItem('PERSONAL_INFO') != undefined || localStorage.getItem('PERSONAL_INFO') != null) {
      const getObj = JSON.parse(localStorage.getItem('PERSONAL_INFO'));
      this.fullname = getObj.fna;
      this.email = getObj.email;
      this.phone = getObj.phone;
      this.location = getObj.location;
      this.dob = getObj.dob;
      this.id = getObj.id;
    } else {
     console.log('');
    }
  }

  setNationalID(type) {
    this.idtype = type;
  }

  setRegion(name) {
    this.region = name;
  }


  setGender(val) {
    this.gender = val;
  }

  checkInput(val) {
    if (val === undefined || val === '') {
      return true;
    }
    return false;
  }

  GoToNext() {
    localStorage.removeItem('PERSONAL_INFO');
    if ( this.checkInput(this.gender) ||  this.checkInput(this.fullname) || this.checkInput(this.idtype)
      || this.checkInput(this.region) || this.checkInput(this.email) || this.checkInput(this.dob)
      || this.checkInput(this.phone) || this.checkInput(location) || this.checkInput(this.id)) {
      return Swal.fire({
        title: '',
        text: 'Please fill all required forms',
        type: 'error',
        confirmButtonText: 'OK'
      });
    } else if (moment().diff(this.dob, 'year') < 18) {
      return Swal.fire({
        title: '',
        text: 'You must be 18years to register',
        type: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      const personalInfo: any = {
        fna: this.fullname,
        email: this.email,
        phone: this.phone,
        location: this.location,
        dob: this.dob,
        region: this.region,
        id: this.id,
        idt: this.idtype,
        gender: this.gender,
      };
      const sha = sha256(JSON.stringify(personalInfo));
      personalInfo.sha = sha;
      localStorage.setItem('PERSONAL_INFO', JSON.stringify(personalInfo));
      this.router.navigate(['2']);
    }
  }
}
