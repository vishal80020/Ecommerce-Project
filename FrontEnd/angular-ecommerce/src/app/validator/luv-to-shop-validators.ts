import { FormControl, ValidationErrors } from "@angular/forms";

export class LuvToShopValidators {
    //form is getting submitted with whitespace in 

    //whitespace validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors {

        //check if string contains only whitespace
        if((control.value!=null) && (control.value.trim().length===0)) {
            //invalid so return error object
            return { 'notOnlyWhitespace':true }// we can keep any name for key but it is 
            // recommended to use same as function name for validation in angular
        }

        //if validation check passes means no erro so return null
        return null;
    }
}
