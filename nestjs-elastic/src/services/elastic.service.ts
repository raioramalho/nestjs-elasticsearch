import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateIndiceDto } from './create-indice.dto';

@Injectable()
export class ElasticService {
  private readonly client: ElasticsearchService;
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(ElasticService.name);
  }

  async createIndex(body: CreateIndiceDto) {
    this.logger.log(`Creating data on elasticDB`);
    return await this.client.indices
      .create({
        index: body.indice,
        body: {
          mappings: {
            properties: {
              nome: { type: 'text' },
              sobrenome: { type: 'text' },
            },
          },
        },
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }
}
