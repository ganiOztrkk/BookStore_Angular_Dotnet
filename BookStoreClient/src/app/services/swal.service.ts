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
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });
    Toast.fire(title, '', icon);
  }

  callSwal(title: string, cancelBtnText: string, confirmBtnText: string, callBack: () => void){
    Swal.fire({
      title: title,
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: cancelBtnText,
      confirmButtonText: confirmBtnText,
      confirmButtonColor: "red"
    }).then(res => {
      if (res.isConfirmed) {
        callBack();
      }
    })
  }
  
  callPaymentSwal(title: string){
    Swal.fire({
      title: title,
      icon: "success",
      position: "center",
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: true
    })
  }


}

type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'