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
    const item = await this.itemModel.findOne({ _id: id }).exec();
    return item;
  }

  async getCategories() {
    const items = await this.itemModel.find().exec();
    const categories = [...new Set(items.map(item => item.category))];
    return categories;
  }
}
