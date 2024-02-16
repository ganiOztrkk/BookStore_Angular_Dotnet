import { Injectable } from '@angular/core';
import { SwalService } from './swal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private swal: SwalService, private translate: TranslateService, private router: Router) {}

  errorHandler(err: HttpErrorResponse) {
    switch (err.status) {
      case 400:
        this.swal.callToast(err.error.message, 'error');
        break;
      case 0:
        this.translate.get('status0error').subscribe((res) => {
          this.swal.callToast(res, 'error');
        });
        document.location.href = "under-maintenance";
        break;
      case 404:
        this.translate.get('status404error').subscribe((res) => {
          this.swal.callToast(res, 'error');
        });
        break;
      case 500:
        this.swal.callToast(err.error.message, 'error');
        break;
      default:
        this.translate.get('notknownerrorstatus').subscribe((res) => {
          this.swal.callToast(res, 'error');
        });
        break;
    }
  }



  
}