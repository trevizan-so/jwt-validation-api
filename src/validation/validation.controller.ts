import { Controller, Get, Post, Body, UseGuards, Logger, HttpCode, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth,ApiResponse, ApiExtraModels } from '@nestjs/swagger';

import { ValidationRequest } from './dto/ValidationRequest.dto';
import { ValidationQuery } from './dto/ValidationQuery.dto';
import { ValidationResponse } from './dto/ValidationResponse.dto';
import { JwtPayload } from '../dto/JwtPayload.dto';

import { AuthGuard } from '../auth/auth.guard';
import { ValidationService } from './validation.service';
import { ValidationTransformer } from './validation.transformer';

@Controller("validation")
@ApiTags('Validation')
@ApiExtraModels(ValidationRequest, ValidationResponse, ValidationQuery, JwtPayload) 
@ApiBearerAuth()
export class ValidationController {

  constructor(private  validationService: ValidationService) {}

  private readonly logger = new Logger(ValidationController.name);

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: JSON.stringify({validade:"verdadeiro"})})
  async validateTokenUsingParam(@Query() query:ValidationQuery) {

    this.logger.log(`[Get] /validation - ${JSON.stringify(query.jwt)}`);

    const input = ValidationTransformer.transformToInputFromParam(query.jwt);
    const output = await this.validationService.validate(input);
    return ValidationTransformer.transformToResponse(output);
  }

  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: JSON.stringify({validade:"verdadeiro"})})
  async validateTokenUsingPayload(@Body() request:ValidationRequest) {

    this.logger.log(`[POST] /validation - ${JSON.stringify(request)}`);

    const input = ValidationTransformer.transformToInput(request);
    const output = await this.validationService.validate(input);
    return ValidationTransformer.transformToResponse(output);
  }
  
}
