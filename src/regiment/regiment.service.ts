import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { Response } from 'express';
import { Model } from 'mongoose';
import * as multerS3 from 'multer-s3';
import { ResultDto } from 'src/dto/result.dto';
import { CreateRegimentDto } from './dto/create-regiment.dto';
import { Regiment } from './entities/regiment.entity';
dotenv.config();

@Injectable()
export class RegimentService {
  constructor(
    @InjectModel('Regiment')
    private readonly regiment: Model<Regiment>
  ) { }

  async uploadFile(file: Express.MulterS3.File): Promise<CreateRegimentDto> {
    const newFile = new this.regiment();

    newFile.fileName = file.key;
    newFile.size = file.size;
    newFile.contentType = file.mimetype;
    newFile.url = file.location;

    return newFile.save();
  }

  async downloadFile(fileName: string, res: Response): Promise<void> {
    const bucketName = process.env.BUCKET_NAME
    const textFile = await this.regiment.findOne({ fileName });

    if (!textFile) {
      throw new NotFoundException('Arquivo não encotnrado');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${textFile.fileName}`);

    res.send(textFile);
  }
}
