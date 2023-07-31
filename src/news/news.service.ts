import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Model } from 'mongoose';
import { News } from './entities/news.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ResultDto } from 'src/dto/result.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('News') private readonly newsModel: Model<News>,
    private readonly usersService: UsersService,
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const { ULRimage, alt, content, title, user } = createNewsDto;

    await this.usersService.findOneId(user);

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

  async findAll(): Promise<News[]> {
    return await this.newsModel.find().exec();
  }

  async findOne(id: string): Promise<News> {
    const foundNews = await this.newsModel
      .findById(id)
      .populate({
        path: 'user',
        select: 'name _id',
        model: 'User',
      })
      .exec();

    if (!foundNews) {
      throw new BadRequestException(
        'Notícia não encontrada, verifique o ID ou chame o suporte!',
      );
    }

    return foundNews;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto): Promise<ResultDto> {
    const { ULRimage, alt, content, title, user } = updateNewsDto;

    await this.usersService.findOneId(user);

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

    if (!user) {
      throw new BadRequestException('Usuário não informado');
    }

    const foundNews = await this.newsModel.findById(id).exec();

    if (!foundNews) {
      throw new BadRequestException(
        'Notícia não encontrada, verifique o ID ou chame o suporte!',
      );
    }

    const result = {
      message: 'Notícia atualizada com sucesso!',
      status: 200,
    };

    await this.newsModel.updateOne({ _id: id }, updateNewsDto).exec();

    return result;
  }

  async remove(id: string): Promise<ResultDto> {
    const foundNews = await this.newsModel.findById(id).exec();

    if (!foundNews) {
      throw new BadRequestException(
        'Notícia não encontrada, verifique o ID ou chame o suporte!',
      );
    }

    const result = {
      message: 'Notícia removida com sucesso!',
      status: 200,
    };

    await this.newsModel.deleteOne({ _id: id }).exec();

    return result;
  }
}
