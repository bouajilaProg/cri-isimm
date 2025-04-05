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


  async getOrdersByUser(userCode: string) {
    try {
      const user = await this.userModel.findOne({ userCode }).exec();

      if (user) {
        if (!user.orders || user.orders.length === 0) {
          return { orders: [] };
        }
        return {
          orders: user.orders.map(order => ({
            id: order._id,
            userId: order.userId,
            items: order.items,
            status: order.status,
            receiveDate: order.receiveDate,
            returnDate: order.returnDate,
            createdAt: order.createdAt,
            reason: order.reason
          }))
        };

      }

      return { message: "User not found", error: "USER_NOT_FOUND" };
    } catch (error) {
      return { message: "An error occurred while fetching the orders", error: error.message };
    }
  }



  async sendOrder(userID: string, orderItems: any[], receiveDate: string, returnDate: string, reason: string) {

    const orderToSave = new this.orderModel({
      userId: userID,
      items: orderItems,
      status: 'pending',
      receiveDate,
      returnDate,
      createdAt: new Date().toISOString(),
      reason,
    });
    const savedOrder = await orderToSave.save();
  }
}
