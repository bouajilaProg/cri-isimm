import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './item.entity';
import { Model } from 'mongoose';

@Injectable()
export class ClientApiService {

  constructor(
    @InjectModel(Item.name) private itemModel: Model<Item>,
  ) { }

  async getAllItems() {
    const items = await this.itemModel.find().exec();
    return items;
  }

  async getItem(id: string) {
    const item = await this.itemModel.findById(id).exec();
    return item;
  }
}
