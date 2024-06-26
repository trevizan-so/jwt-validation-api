import { Controller, Get, Post, Body } from '@nestjs/common';
import { ValidationResponse } from './dto/ValidationResponse.dto';
import { ValidationRequest } from './dto/ValidationRequest.dto';
import { ValidationService } from './validation.service';
import { ValidationInput } from '../dto/ValidationInput.dto';
import { ValidationTransformer } from './validation.transformer';


@Controller("validation")
export class ValidationController {
  constructor(private  validationService: ValidationService) {}

  @Post()
  validateTokenUsingPayload(@Body() request:ValidationRequest) {
    const input = ValidationTransformer.transformToInput(request);
    const output = this.validationService.validate(input);
    return ValidationTransformer.transformToResponse(output);
  }
  
}
