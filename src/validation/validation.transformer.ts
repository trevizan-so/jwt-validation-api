import { ValidationInput } from "../dto/ValidationInput.dto";
import { ValidationOutput } from "../dto/ValidationOutput.dto";
import { ValidationRequest } from "./dto/ValidationRequest.dto";
import { ValidationResponse } from "./dto/ValidationResponse.dto";

const VERDADEIRO = "verdadeiro";
const FALSO = "falso";

export class ValidationTransformer {
    
    public static transformToInput(request: ValidationRequest) {
        let input = new ValidationInput();

        input.setJwt(request.jwt);

        return input;
    }

    public static transformToInputFromParam(param: string) {
        let input = new ValidationInput();

        input.setJwt(param);

        return input;
    }

    public static transformToResponse(output: ValidationOutput) {
        let response = new ValidationResponse();

        response.setValido(output.getIsValid() ? VERDADEIRO : FALSO);

        return response;
    }
}
