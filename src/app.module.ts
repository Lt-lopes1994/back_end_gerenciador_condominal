import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { TokenModule } from './token/token.module';
import { CondominiumModule } from './condominium/condominium.module';
import { AdministratorModule } from './administrator/administrator.module';
import { SpaceReservationModule } from './space-reservation/space-reservation.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      },
      defaults: {
        from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter()
      }
    }),
    MongooseModule.forRoot(`${process.env.mongoURL}`),
    AuthModule,
    TokenModule,
    NewsModule,
    CondominiumModule,
    AdministratorModule,
    SpaceReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
