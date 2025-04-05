import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { UserOrderService } from './user-order.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: UserOrderService
  ) { }


  @Get("user/:userCode")
  async getOrdersByUser(@Param("userCode") userCode: string) {
    const response = await this.orderService.getOrdersByUser(userCode);

    if (response && response.orders) {
      if (response.orders.length > 0) {
        return response.orders;
      } else {
        return {
          statusCode: 204,
          message: "User found but no orders available."
        };
      }
    } else if (response && response.message) {
      throw new NotFoundException({
        statusCode: 404,
        error: response.message || "User not found."
      });
    } else {
      throw new InternalServerErrorException({
        statusCode: 500,
        error: "An unexpected error occurred."
      });
    }
  }




  @Post('/')
  async sendOrder(
    @Body('userID') userID: string,
    @Body('items') orderItems: any[],
    @Body('receiveDate') receiveDate: string,
    @Body('returnDate') returnDate: string,
    @Body('reason') reason: string,
  ) {
    return this.orderService.sendOrder(userID, orderItems, receiveDate, returnDate, reason);
  }
}
