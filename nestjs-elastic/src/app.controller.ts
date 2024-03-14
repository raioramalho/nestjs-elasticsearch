import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ElasticService } from './services/elastic.service';
import { CreateIndiceDto } from './services/dto/create-indice.dto';
import {
  CreatePessoasBodyDto,
  CreatePessoasQueryDto,
} from './services/dto/create-pessoas.dto';
import { GetPessoasQueryDto } from './services/dto/get-pessoas.dto';

@Controller('')
export class AppController {
  private readonly logger: Logger;
  constructor(private readonly elasticService: ElasticService) {
    this.logger = new Logger(AppController.name);
  }

  @Post('/indice')
  createIndice(@Body() body: CreateIndiceDto) {
    this.logger.log(`POST ["/"]`);
    return this.elasticService.createIndex(body);
  }

  @Post('/document')
  createDocument(
    @Body() body: CreatePessoasBodyDto,
    @Query() params: CreatePessoasQueryDto,
  ) {
    this.logger.log(`POST ["/document?indice=${params.indice}"]`);
    return this.elasticService.createDocument(body, params);
  }

  @Get('/document')
  getDocument(@Query() params: GetPessoasQueryDto) {
    this.logger.log(`GET ["/document?indice=${params.indice}"]`);
    return this.elasticService.GetDocument(params);
  }
}
