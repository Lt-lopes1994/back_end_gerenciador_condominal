import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { TokenModule } from './token/token.module';
import { CondominiumModule } from './condominium/condominium.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(`${process.env.mongoURL}`),
    AuthModule,
    TokenModule,
    NewsModule,
    CondominiumModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
