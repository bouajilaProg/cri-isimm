import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";



@Schema()
export class Item {
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  image: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

