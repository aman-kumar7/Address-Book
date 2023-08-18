import { Component, OnInit } from '@angular/core';

import { ContactService } from '../service';
import { Contact } from '../model';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {

    contactList: Contact[] = [];
    constructor(private contactService: ContactService) { }

    ngOnInit() {
        this.getContactDetailList();

        this.contactService.isContactFormChanged.subscribe(() => {
            this.getContactDetailList();        
        })
    }

    getContactDetailList() {
        this.contactService.getContactList().subscribe(result => {
            this.contactList = result;
        });
    }
}
