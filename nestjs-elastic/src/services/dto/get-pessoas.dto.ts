import { PartialType } from '@nestjs/swagger';
import { CreateIndiceDto } from './create-indice.dto';

export class GetPessoasQueryDto extends PartialType(CreateIndiceDto) {
  indice: string;
  id: string;
}
