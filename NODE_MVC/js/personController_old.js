
function Person(args){
    this.name = args.name;
    this.surname = args.surname;
    this.dob = args.dob;
};



Person.prototype.validate = function(propertyName, validateFunction,parameters){

     var valid = validateFunction.apply(this,parameters);
     
     return {
          property: propertyName, 
          isValid: valid 
     };
}

function validateName(value){
    if(value === "me"){
        return true;
    }
    return false;
}
 
 

var personController = function(){
    
  var obj = {};
    obj.postPerson = function(clientRequest, serverResponse) {
        debugger;
        var p = new  Person(clientRequest.body);    
            
            serverResponse.json(
            {   name: {value: p.name,
                isValid: p.validate("name",validateName,[p.name])     
            },
            surname:p.surname
         });
    }
    
    return obj;
    
}()



exports.personController = personController
