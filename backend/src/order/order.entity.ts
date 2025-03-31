import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Item } from 'src/items/item.entity';

@Schema()
export class OrderItem {
  _id: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Item', required: true })
  productId: ObjectId;

  @Prop({ type: Item, required: true })
  product: Item;

  @Prop({ required: true })
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema()
export class Order {
  _id: ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' })
  status: 'pending' | 'approved' | 'rejected' | 'completed';

  @Prop({ required: true })
  receiveDate: string;

  @Prop({ required: true })
  returnDate: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ required: true })
  reason: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
