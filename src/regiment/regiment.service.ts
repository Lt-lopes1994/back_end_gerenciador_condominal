import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { Response } from 'express';
import { Model } from 'mongoose';
import { CreateRegimentDto } from './dto/create-regiment.dto';
import { Regiment } from './entities/regiment.entity';
dotenv.config();

@Injectable()
export class RegimentService {
  constructor(
    @InjectModel('Regiment')
    private readonly regiment: Model<Regiment>,
    private readonly s3: S3
  ) { }

  async uploadFile(file: Express.MulterS3.File): Promise<CreateRegimentDto> {
    const newFile = new this.regiment();

    newFile.fileName = file.key;
    newFile.size = file.size;
    newFile.contentType = file.mimetype;
    newFile.url = file.location;

    return newFile.save();
  }

  async downloadFile(name: string, res: Response): Promise<void> {
    const textFile = await this.regiment.findOne({ fileName: name });

    if (!textFile) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    const url = await this.s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.BUCKET_NAME,
      Key: textFile.fileName,
      Expires: 60
    });



    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${textFile.fileName}`);
    console.log(url);

    return res.redirect(302, url);
  }
}
