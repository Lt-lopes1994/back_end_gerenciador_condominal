import { MailerModule } from '@nestjs-modules/mailer';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SupportSchema } from './entities/support.schema';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';

@Module({
  imports: [
    MailerModule,
    MongooseModule.forFeature([{ name: 'Support', schema: SupportSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [SupportController],
  providers: [SupportService],
  exports: [SupportService],
})
export class SupportModule { }
