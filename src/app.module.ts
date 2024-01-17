import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AdministratorModule } from './administrator/administrator.module';
import { AuthModule } from './auth/auth.module';
import { CommomAreasModule } from './commom-areas/commom-areas.module';
import { CondominiumModule } from './condominium/condominium.module';
import { NewsModule } from './news/news.module';
import { PaymentModule } from './payment/payment.module';
import { RegimentModule } from './regiment/regiment.module';
import { SharedModule } from './shared/shared.module';
import { SpaceReservationModule } from './space-reservation/space-reservation.module';
import { TokenModule } from './token/token.module';
import { VisitorsModule } from './visitors/visitors.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads'
    }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    MongooseModule.forRoot(`${process.env.mongoURL}`),
    AuthModule,
    TokenModule,
    NewsModule,
    CondominiumModule,
    AdministratorModule,
    SpaceReservationModule,
    SharedModule,
    CommomAreasModule,
    RegimentModule,
    PaymentModule,
    VisitorsModule,
    SupportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
