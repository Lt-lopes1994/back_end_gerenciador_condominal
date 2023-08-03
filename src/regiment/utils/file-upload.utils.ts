import { BadRequestException } from '@nestjs/common';

export const fileFilter = (file) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
        throw new BadRequestException('Apenas arquivos em pdf são permitidos');
    }
};