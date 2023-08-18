export class Contact{
    id:number;
    name:string;
    email:string;
    mobile:number;
    landline?:number;
    website:string;
    address:string;
    
    constructor(args:any){
     this.id=args.id;
     this.name=args.name;
     this.email=args.email;
     this.mobile=args.mobile;
     this.website=args.website;
     this.address=args.address;
    }
}