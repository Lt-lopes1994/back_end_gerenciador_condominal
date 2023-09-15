import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import multerConfig from 'src/configs/multer-config';
import { CreateRegimentDto } from './dto/create-regiment.dto';
import { RegimentService } from './regiment.service';


@Controller('regimento')
export class RegimentController {
  constructor(
    private readonly regimentService: RegimentService
  ) { }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', multerConfig)
  )
  upload(@UploadedFile() file: Express.MulterS3.File): Promise<CreateRegimentDto> {
    if (!file.originalname.match(/\.(pdf)$/)) {
      throw new BadRequestException('Apenas arquivos em pdf são permitidos');
    }

    return this.regimentService.uploadFile(file);
  }

  // @Get(':name')
  // async download(@Param('name') name: string, @Res() res: Response): Promise<void | any> {
  //   return this.regimentService.downloadFile(name, res);
  // }

  @Get()
  async download(): Promise<void | string> {
    return this.regimentService.downloadFile();
  }
}
