import { Controller, Get } from '@nestjs/common';
import { UserOrderService } from './user-order.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: UserOrderService
  ) { }

  @Get("user/:userID")
  async getOrdersByUser(userID: string) {
    return this.orderService.getOrdersByUser(userID);
  }

}
