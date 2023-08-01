import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Condominium } from 'src/condominium/entities/condominium.entity';

@Injectable()
export class SharedService {
    constructor(
        @InjectModel('Condominium')
        private readonly condominium: Model<Condominium>
    ) { }

    async findCode(code: string): Promise<Condominium | void> {
        const foundCondominium = await this.condominium.findOne({ codeCondominium: code });

        return foundCondominium;
    }
}