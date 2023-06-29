import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Model } from 'mongoose';
import { News } from './entities/news.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ResultDto } from 'src/dto/result.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel('News') private readonly newsModel: Model<News>) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const { ULRimage, alt, content, title } = createNewsDto;

    if (!ULRimage) {
      throw new BadRequestException('URL da imagem não informada');
    }

    if (!alt) {
      throw new BadRequestException('Descrição da imagem não informada');
    }

    if (!content) {
      throw new BadRequestException('Conteúdo da notícia não informado');
    }

    if (!title) {
      throw new BadRequestException('Título da notícia não informado');
    }

    const newNews = new this.newsModel(createNewsDto);

    return newNews.save();
  }

  findAll() {
    return this.newsModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
