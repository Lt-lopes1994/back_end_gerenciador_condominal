import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { Response } from 'express';
import { Model } from 'mongoose';
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

  async downloadFile(name: string, res: Response): Promise<void | string> {
    const textFile = await this.regiment.findOne({ fileName: name });

    if (!textFile) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    return res.redirect(textFile.url)
  }
}
