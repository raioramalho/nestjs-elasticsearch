import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ElasticService } from './services/elastic.service';
import { CreateIndiceDto } from './services/create-indice.dto';

@Controller()
export class AppController {
  private readonly logger: Logger;
  constructor(private readonly elasticService: ElasticService) {
    this.logger = new Logger(AppController.name);
  }

  @Post('/')
  createPerson(@Body() body: CreateIndiceDto) {
    this.logger.log(`POST ["/"]`);
    return this.elasticService.createIndex(body);
  }
}
