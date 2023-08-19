import { Component } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

@Component({
    selector: 'app-toastr',
    templateUrl: './toastr.component.html',
})
export class ToastrComponent extends Toast {

    // constructor is only necessary when not using AoT
    constructor(
        protected toastrService: ToastrService,
        public toastPackage: ToastPackage,
    ) {
        super(toastrService, toastPackage);
    }

    getIconClass() {
        return this.toastPackage.toastType === 'success'
            ? 'bi-check-circle'
            : this.toastPackage.toastType === 'warning'
            ? 'bi-exclamation-circle'
            : this.toastPackage.toastType === 'error'
            ? 'bi-x-circle'
            : 'bi-info-circle';
    }
}