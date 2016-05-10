
import {BaseModel} from './BaseModel';



export class Person extends BaseModel{
        
        public name:string;
        public surname:string;
        public dob:string;
        
        public constructor(requestBody:any)
        {
            super();
            this.name = requestBody.name;
            this.dob = requestBody.dob;
            this.surname = requestBody.surname;
        }
}