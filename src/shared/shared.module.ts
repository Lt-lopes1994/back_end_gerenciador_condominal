import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CondominiumSchema } from 'src/condominium/entities/concominium.schema';
import { SharedService } from './shared.service';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        MongooseModule.forFeature([
            { name: 'Condominium', schema: CondominiumSchema },
        ]),
        forwardRef(() => UsersModule)
    ],
    providers: [SharedService],
    exports: [SharedService]
})
export class SharedModule { }
