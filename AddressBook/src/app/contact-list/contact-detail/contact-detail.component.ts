import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContactService } from '../../service';
import { Contact } from '../../model';

@Component({
    selector: 'app-contact-detail',
    templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {

    contactDetail!: Contact;   

    constructor(private contactService: ContactService, private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            const id:number = params.id;
            this.showContactDetail(id);
        });        
    }

    showContactDetail(id:number) {
        this.contactService.getContactById(id).subscribe((result) => {
            this.contactDetail = result;
        });
    }

    deleteContactDetail(id: number) {
        this.contactService.deleteContact(id).subscribe(() => {
        });
    }
}
