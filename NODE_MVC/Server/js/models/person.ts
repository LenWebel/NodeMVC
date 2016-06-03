
import {BaseModel} from './BaseModel';
import {PersonValidator} from '../validators/personValidator'
import {MVC} from "../MVC";


export class Person extends BaseModel{
        
        
        @MVC.Required("Please provide a valid first name",PersonValidator.NameValidation)
        public name:string;

        @MVC.Required("Please provide a valid surname",PersonValidator.SurNameValidation)
        public surname:string;
        
        @MVC.Required("Please provide a valid date",PersonValidator.DOBDateValidation)
        @MVC.Required("You must be over the age of 37",PersonValidator.DOBAgeValidation)
        public dob:string;
        
        public constructor(requestBody:any)
        {
            super();
            this.name = requestBody.name;
            this.dob = requestBody.dob;
            this.surname = requestBody.surname;
        }
}

