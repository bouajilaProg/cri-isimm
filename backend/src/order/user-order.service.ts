import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.entity';
import { Model } from 'mongoose';
import { User } from 'src/user/user.entity';

@Injectable()
export class UserOrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async getOrdersByUser(userID: string) {

    const user = await this.userModel.findOne({ userID }).exec();
    if (user) {
      return user.orders
    }
    return { message: "User not found" }
  }

}
