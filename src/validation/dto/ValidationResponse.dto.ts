export class ValidationResponse{
    valido:string;

    constructor(){};

    public getValido(){
        return this.valido;
    }

    public setValido(valido:string){
        this.valido = valido;
    };
}