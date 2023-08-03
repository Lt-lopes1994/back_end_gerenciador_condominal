import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(txt|pdf|doc|wpd|rtf)$/)) {
        return callback(new BadRequestException('Apenas arquivos de texto são permitidos'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    callback(null, `${name}${fileExtName}`);
};