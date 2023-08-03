import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommomAreasService } from './commom-areas.service';
import { CreateCommomAreaDto } from './dto/create-commom-area.dto';
import { UpdateCommomAreaDto } from './dto/update-commom-area.dto';

@Controller('commom-areas')
export class CommomAreasController {
  constructor(private readonly commomAreasService: CommomAreasService) {}

  @Post('/create')
  create(@Body() createCommomAreaDto: CreateCommomAreaDto) {
    return this.commomAreasService.create(createCommomAreaDto);
  }

  @Get('/all/:id')
  findAll(@Param('id') condominiumId: string) {
    return this.commomAreasService.findAll(condominiumId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commomAreasService.findOne(id);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCommomAreaDto: UpdateCommomAreaDto,
  ) {
    return this.commomAreasService.update(id, updateCommomAreaDto);
  }

  @Delete('/:_id')
  remove(@Param('_id') _id: string) {
    return this.commomAreasService.remove(_id);
  }
}
