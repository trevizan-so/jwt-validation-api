export class ValidationOutput{

    isValid:boolean;

    constructor(isValid:boolean){
        this.isValid = isValid;
    }

    public getIsValid(): boolean {
        return this.isValid;
    }

    public setIsValid(isValid: boolean): void {
        this.isValid = isValid;
    }
    
}