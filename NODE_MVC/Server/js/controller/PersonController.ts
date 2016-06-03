
import {Person} from '../models/person';
import {BaseController} from './BaseController';
import "reflect-metadata";
import {MVC} from "../MVC";

export class PersonController extends BaseController 
{
    
    @MVC.httpGet('/:person_id')
    public GetPerson(req:any,res:any){
            res.json({ message: req.params.person_id});
        }


    @MVC.httpGet('/getstudent/:student_id')    
    public GetStudent(req:any,res:any):void{
            res.json({ message: req.params.student_id});
    }
    
    @MVC.httpPost('/:student_id')
    public CreatePerson(req:any,res:any):void{
            
            var person = new Person(req.body);
              
            person.validationErrors = MVC.ValidateModel(person);        
            
            if(person.isValid){
                // valid model
                res.json(
                    { 
                        params: req.params.student_id,
                        body: req.body
                });
                 
            }else{
            // invalid model.
            res.json({
                validationErrors:person.validationErrors
            })
            }

            
    }
    
    
}


//export = PersonController;