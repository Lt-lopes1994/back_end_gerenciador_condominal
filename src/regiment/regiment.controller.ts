import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import multerConfig from 'src/configs/multer-config';
import { ResultDto } from 'src/dto/result.dto';
import { CreateRegimentDto } from './dto/create-regiment.dto';
import { RegimentService } from './regiment.service';
import { fileFilter } from './utils/file-upload.utils';

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

  @Get(':fileName')
  async downloadFile(@Param('fileName') fileName: string, @Res() res: Response): Promise<void> {
    return this.downloadFile(fileName, res);
  }
}
