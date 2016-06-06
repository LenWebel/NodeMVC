
export class BaseModel{

    public isValid: boolean = this.validationErrors === undefined || this.validationErrors.length === 0;
    public validationErrors = [];
    
}

