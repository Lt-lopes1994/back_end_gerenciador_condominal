import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResultDto } from 'src/dto/result.dto';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import { Support } from './entities/support.entity';

@Injectable()
export class SupportService {

  constructor(
    @InjectModel('Support')
    private readonly supportModel: Model<Support>,
    private mailService: MailerService
  ) {

  }
  async create(createSupportDto: CreateSupportDto): Promise<ResultDto> {
    const {
      name,
      email,
      phone,
      tower,
      door,
      title,
      text_area
    } = createSupportDto;

    if (
      !name ||
      !email ||
      !phone ||
      !tower ||
      !door ||
      !title ||
      !text_area
    ) {
      throw new BadRequestException('Todos os campos são obrigatórios!');
    }

    const codeGenerator = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    createSupportDto.ticket_number = Number(codeGenerator);

    const ticket = new this.supportModel(createSupportDto);

    await ticket.save();

    await this.mailService.sendMail({
      to: email.trim(),
      subject: title,
      template: 'support',
      context: {
        email: {
          name: name,
          ticketNumber: createSupportDto.ticket_number,
          date: new Date().toLocaleDateString(),
        }
      }
    });

    return {
      message: 'Seu ticket foi criado com sucesso',
      status: 201,
    }
  }

  findAll() {
    return `This action returns all support`;
  }

  findOne(id: number) {
    return `This action returns a #${id} support`;
  }

  update(id: number, updateSupportDto: UpdateSupportDto) {
    return `This action updates a #${id} support`;
  }

  async remove(id: string): Promise<ResultDto> {
    const findTicket = await this.supportModel.findById(id);

    if (!findTicket) {
      throw new BadRequestException('Ticket não encontrado!');
    }

    await this.supportModel.findByIdAndDelete(id);

    return {
      message: 'Ticket deletado com sucesso!',
      status: 200,
    }
  }
}
