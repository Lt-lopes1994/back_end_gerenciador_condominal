import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { Response } from 'express';
import { Model } from 'mongoose';
import { RegimentDto } from './dto/regiment.dto';
import { Regiment } from './entities/regiment.entity';
dotenv.config();

@Injectable()
export class RegimentService {
  constructor(
    @InjectModel('Regiment')
    private readonly regiment: Model<Regiment>
  ) { }

  async uploadFile(file: Express.MulterS3.File): Promise<any> {
    const newFile = new this.regiment();

    newFile.fileName = file.key;
    newFile.size = file.size;
    newFile.contentType = file.mimetype;
    newFile.url = file.location;

    return newFile.save();
  }

  // async downloadFile(name: string, res: Response): Promise<void | any> {
  //   const textFile = await this.regiment.findOne({ fileName: name });

  //   const file = await this.regiment.find()

  //   // if (!textFile) {
  //   //   throw new NotFoundException('Arquivo não encontrado.');
  //   // }

  //   // return res.redirect(textFile.url)
  // }

  async downloadFile(): Promise<void | string> {
    const file = await this.regiment.find();

    if (file.length < 1) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    const foundFile = file[file.length - 1];

    const returnFile: RegimentDto = {
      fileName: foundFile.fileName,
      size: foundFile.size,
      contentType: foundFile.contentType,
      url: foundFile.url,
      createdAt: foundFile.createdAt
    }

    return returnFile.url;
  }
}
