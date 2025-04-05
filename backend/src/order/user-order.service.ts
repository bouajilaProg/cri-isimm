import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.entity';
import { Model } from 'mongoose';
import { User } from 'src/user/user.entity';
import { Item } from 'src/items/item.entity';

@Injectable()
export class UserOrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Item.name) private itemModel: Model<Item>,
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

    // Validate the input data
    if (!userID || !orderItems || orderItems.length === 0 || !receiveDate || !returnDate || !reason) {
      //      throw new Error("Invalid input data");
      console.log("userID", userID);
      console.log("orderItems", orderItems);
      console.log("receiveDate", receiveDate);
      console.log("returnDate", returnDate);
      console.log("reason", reason);
      return { message: "Invalid input data", error: "INVALID_INPUT" };
    }

    // get the user id
    const user_id = (await this.userModel.findOne({ userCode: userID }).exec())?._id;

    if (!user_id) {
      console.log("User not found");
      return { message: "User not found", error: "USER_NOT_FOUND" };
    }

    const orderToSave = new this.orderModel({
      userId: user_id,
      items: orderItems,
      status: 'pending',
      receiveDate,
      returnDate,
      createdAt: new Date().toISOString(),
      reason,
    });
    const savedOrder = await orderToSave.save();

    // update products
    for (const item of orderItems) {
      const product = await this.itemModel.findById(item.productId).exec();
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      } else {
        console.log("Product not found");
        return { message: "Product not found", error: "PRODUCT_NOT_FOUND" };
      }
    }

    // Update the user with the new order
    const user = await this.userModel.findById(user_id).exec();
    if (user) {
      user.orders.push(savedOrder);
      await user.save();
    } else {
      console.log("User not found");
      return { message: "User not found", error: "USER_NOT_FOUND" };
    }

    console.log("successfully saved order", savedOrder);
  }
}
