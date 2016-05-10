
import {MVC} from "../MVC";

export interface IValidator{}

export class BaseController {
    constructor(router:any){
        MVC.router = router;
    }
}