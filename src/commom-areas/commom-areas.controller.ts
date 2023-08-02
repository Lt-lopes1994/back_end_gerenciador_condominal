import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommomAreasService } from './commom-areas.service';
import { CreateCommomAreaDto } from './dto/create-commom-area.dto';
import { UpdateCommomAreaDto } from './dto/update-commom-area.dto';

@Controller('commom-areas')
export class CommomAreasController {
  constructor(private readonly commomAreasService: CommomAreasService) {}

  @Post()
  create(@Body() createCommomAreaDto: CreateCommomAreaDto) {
    return this.commomAreasService.create(createCommomAreaDto);
  }

  @Get()
  findAll() {
    return this.commomAreasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commomAreasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommomAreaDto: UpdateCommomAreaDto) {
    return this.commomAreasService.update(+id, updateCommomAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commomAreasService.remove(+id);
  }
}
