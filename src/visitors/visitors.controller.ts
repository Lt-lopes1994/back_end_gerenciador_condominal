import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import multerConfig from 'src/configs/multer-config';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { VisitorsService } from './visitors.service';

@Controller('visitors')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  create(@Body() createVisitorDto: CreateVisitorDto, @UploadedFile() photo: Express.MulterS3.File) {
    return this.visitorsService.create(createVisitorDto, photo);
  }

  @Get()
  findAll() {
    return this.visitorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitorDto: UpdateVisitorDto) {
    return this.visitorsService.update(+id, updateVisitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitorsService.remove(+id);
  }
}
