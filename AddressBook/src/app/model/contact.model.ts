export class Contact {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    mobile: number;
    website?: string;
    address?: string;
    description?: string;

    constructor(args: any) {
        this.id = args.id;
        this.firstname = args.firstname;
        this.lastname = args.lastname;
        this.email = args.email;
        this.mobile = args.mobile;
        this.website = args.website;
        this.address = args.address;
        this.description = args.description;
    }
}