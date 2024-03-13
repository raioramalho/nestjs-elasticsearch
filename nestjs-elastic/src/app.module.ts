import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ElasticService } from './services/elastic.service';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  controllers: [AppController],
  providers: [ElasticService],
})
export class AppModule {}
