import { Controller, Get, Post, Body, UseGuards, Logger, HttpCode, Query } from '@nestjs/common';
import { ValidationResponse } from './dto/ValidationResponse.dto';
import { ValidationRequest } from './dto/ValidationRequest.dto';
import { ValidationService } from './validation.service';
import { ValidationInput } from '../dto/ValidationInput.dto';
import { ValidationTransformer } from './validation.transformer';
import { AuthGuard } from '../auth/auth.guard';
import { query } from 'express';


@Controller("validation")
export class ValidationController {
  constructor(private  validationService: ValidationService) {}

  private readonly logger = new Logger(ValidationController.name);

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(200)
  async validateTokenUsingParam(@Query() query:any) {

    this.logger.log(`[Get] /validation - ${JSON.stringify(query.jwt)}`);

    const input = ValidationTransformer.transformToInputFromParam(query.jwt);
    const output = await this.validationService.validate(input);
    return ValidationTransformer.transformToResponse(output);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(200)
  async validateTokenUsingPayload(@Body() request:ValidationRequest) {

    this.logger.log(`[POST] /validation - ${JSON.stringify(request)}`);

    const input = ValidationTransformer.transformToInput(request);
    const output = await this.validationService.validate(input);
    return ValidationTransformer.transformToResponse(output);
  }
  
}
