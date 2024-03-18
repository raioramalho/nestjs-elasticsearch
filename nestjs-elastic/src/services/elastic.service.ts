import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateIndiceDto } from './dto/create-indice.dto';
import {
  CreatePessoasBodyDto,
  CreatePessoasQueryDto,
} from './dto/create-pessoas.dto';
import { GetPessoasQueryDto } from './dto/get-pessoas.dto';

@Injectable()
export class ElasticService {
  private readonly logger: Logger;

  constructor(private readonly search: ElasticsearchService) {
    this.logger = new Logger(ElasticService.name);
  }

  async createIndex(body: CreateIndiceDto) {
    try {
      this.logger.log(`Creating index on elasticDB: ${body.indice}`);
      const result = await this.search.indices.create({
        index: body.indice,
        body: {
          mappings: {
            properties: {
              nome: { type: 'text' },
              sobrenome: { type: 'text' },
              idade: { type: 'integer' },
              sexo: { type: 'integer' },
              foto: { type: 'binary' },
            },
          },
        },
      });
      return result;
    } catch (error) {
      this.logger.error(`Error creating index: ${error.message}`);
      throw new HttpException(
        {
          message: `Error indexing document:`,
          error: JSON.parse(error.message),
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async createDocument(
    body: CreatePessoasBodyDto,
    params: CreatePessoasQueryDto,
  ) {
    try {
      this.logger.log(`Indexing document into index: ${params.indice}`);
      const result = await this.search.index({
        index: params.indice,
        body,
      });
      return result;
    } catch (error) {
      this.logger.error(`Error indexing document: ${error.message}`);
      throw new HttpException(
        {
          message: `Error indexing document:`,
          error: JSON.parse(error.message),
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async GetAllDocuments(params: GetPessoasQueryDto) {
    try {
      this.logger.log(`Gettering all documents from index: ${params.indice}`);
      return await this.search.search({
        index: params.indice,
      });
    } catch (error) {
      throw new HttpException(
        {
          message: `Error indexing document:`,
          error: JSON.parse(error.message),
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async GetDocument(params: GetPessoasQueryDto) {
    try {
      this.logger.log(
        `Gettering document with id: ${params.id} of index: ${params.indice}`,
      );
      return await this.search.get({
        index: params.indice,
        id: params.id,
      });
    } catch (error) {
      throw new HttpException(
        {
          message: `Error indexing document:`,
          error: JSON.parse(error.message),
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async UpdateDocument(body: any, params: GetPessoasQueryDto) {
    try {
      this.logger.log(
        `Updating document with id: ${params.id} of index: ${params.indice}`,
      );
      const document = await this.GetDocument(params);
      return await this.search.update({
        index: document._index,
        id: document._id,
        doc: body,
      });
    } catch (error) {
      throw new HttpException(
        {
          message: `Error indexing document:`,
          error: JSON.parse(error.message),
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async DeleteDocument(params: GetPessoasQueryDto) {
    try {
      this.logger.log(
        `Deleting document with id: ${params.id} of index: ${params.indice}`,
      );
      const document = await this.GetDocument(params);
      return await this.search.delete({
        index: document._index,
        id: document._id,
      });
    } catch (error) {
      throw new HttpException(
        {
          message: `Error indexing document:`,
          error: JSON.parse(error.message),
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
