import { PartialType } from '@nestjs/swagger';
import { CreatePessoasBodyDto } from './create-pessoas.dto';
import { CreateIndiceDto } from './create-indice.dto';

export class GetPessoasQueryDto extends PartialType(CreateIndiceDto) {
  indice: string;
  id: string;
}

export class GetPessoasBodyDto extends PartialType(CreatePessoasBodyDto) {
  nome?: string;
  sobrenome?: string;
}
