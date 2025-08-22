import { PartialType } from '@nestjs/mapped-types';
import { AddStyleDto } from './add-new-style.dto';

export class UpdateStyleDto extends PartialType(AddStyleDto) { }
