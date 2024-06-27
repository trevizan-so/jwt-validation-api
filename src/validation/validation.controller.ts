import { Controller, Get, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { ValidationResponse } from './dto/ValidationResponse.dto';
import { ValidationRequest } from './dto/ValidationRequest.dto';
import { ValidationService } from './validation.service';
import { ValidationInput } from '../dto/ValidationInput.dto';
import { ValidationTransformer } from './validation.transformer';
import { AuthGuard } from '../auth/auth.guard';


@Controller("validation")
export class ValidationController {
  constructor(private  validationService: ValidationService) {}

  private readonly logger = new Logger(ValidationController.name);

  @UseGuards(AuthGuard)
  @Post()
  async validateTokenUsingPayload(@Body() request:ValidationRequest) {

    this.logger.log(`[POST] /validation - ${JSON.stringify(request)}`);

    const input = ValidationTransformer.transformToInput(request);
    const output = await this.validationService.validate(input);
    return ValidationTransformer.transformToResponse(output);
  }
  
}
