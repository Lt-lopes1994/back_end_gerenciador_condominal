import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { VisitorSchema } from './entities/visitor.schema';
import { VisitorsController } from './visitors.controller';
import { VisitorsService } from './visitors.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Visitor', schema: VisitorSchema }]),
    forwardRef(() => AuthModule)
  ],
  controllers: [VisitorsController],
  providers: [VisitorsService]
})
export class VisitorsModule { }
