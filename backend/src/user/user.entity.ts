import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import { Order } from "src/order/order.entity";



@Schema()
export class User {
  _id: ObjectId;

  @Prop({ required: true })
  userCode: string

  @Prop({ required: true })
  tel: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  orders: Order[];

}

export const UserSchema = SchemaFactory.createForClass(User);

