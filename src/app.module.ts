import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(`${process.env.mongoURL}`),
    AuthModule,
    TokenModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
