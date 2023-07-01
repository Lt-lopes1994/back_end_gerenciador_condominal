import { Module, forwardRef } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './entities/news.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
