import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callToast(title: string, icon: SweetAlertIcon = "success"){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false
    });
    Toast.fire(title, '', icon);
  }
}

type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'