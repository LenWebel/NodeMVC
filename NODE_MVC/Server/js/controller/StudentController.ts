
import {Person} from '../models/person';
//import {BaseController} from './BaseController';
import "reflect-metadata";
import {MVC,Controller} from "../MVC";

export class StudentController extends Controller 
{

    @MVC.httpGet('/thing1')
    public Getthing1(req,res){
         res.json({ message: "req"});
       }
    
    @MVC.httpGet('thing2')
    public Getthing2(req:any,res:any){
         res.json({ message: "req"});
    }
}


//export = PersonController;