import { Module } from '@nestjs/common';
import { UserOrderService } from './user-order.service';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema, OrderItem, OrderItemSchema } from './order.entity';
import { OrderController } from './order.controller';
import { User, UserSchema } from 'src/user/user.entity';
import { Item, ItemSchema } from 'src/items/item.entity';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderItem.name, schema: OrderItemSchema },
      { name: User.name, schema: UserSchema },
      { name: Item.name, schema: ItemSchema }
    ]),
  ],
  providers: [UserOrderService],
  controllers: [OrderController],
})
export class OrderModule { }
