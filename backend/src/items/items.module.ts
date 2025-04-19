import { Module } from '@nestjs/common';
import { ClientApiService } from './client-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './item.entity';
import { ItemsController } from './items.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  providers: [ClientApiService],
  controllers: [ItemsController]
})
export class ItemsModule { }
