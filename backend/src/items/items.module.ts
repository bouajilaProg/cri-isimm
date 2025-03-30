import { Module } from '@nestjs/common';
import { ClientApiService } from './client-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { Item, ItemSchema } from './item.entity';
import { ItemsController } from './items.controller';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  providers: [ClientApiService],
  controllers: [ItemsController]
})
export class ItemsModule { }
