import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContactService } from '../../service';
import { Contact } from '../../model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-contact-detail',
    templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit, OnDestroy {

    contactDetail!: Contact; 
    suscription!: Subscription;  

    constructor(private contactService: ContactService, private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getContactId();
        // this.suscription = this.contactService.isContactListChanged.subscribe((data: any)=>{
        //     this.getContactId();
        // });
    }

    getContactId() {
        this.activatedRoute.params.subscribe((params) => {
            const id: number = params.id;
            this.getContactDetail(id);
        });
    }

    getContactDetail(id:number) {
        this.contactService.getContactById(id).subscribe((result) => {
            this.contactDetail = result;
        });
    }

    ngOnDestroy(): void {
        this.suscription.unsubscribe();
    }

}
