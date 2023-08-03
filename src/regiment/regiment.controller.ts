import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ResultDto } from 'src/dto/result.dto';
import { RegimentService } from './regiment.service';
import { editFileName, fileFilter } from './utils/file-upload.utils';

@Controller('regimento')
export class RegimentController {
  constructor(
    private readonly regimentService: RegimentService
  ) { }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: editFileName
      }),
      fileFilter: fileFilter
    })
  )
  upload(@UploadedFile() file: Express.Multer.File): Promise<ResultDto> {
    return this.regimentService.uploadFile(file)
  }

  @Get(':filePath')
  getFile(@Param('filePath') file, @Res() res) {
    return res.sendFile(file, { root: 'src/uploads' });
  }
}
