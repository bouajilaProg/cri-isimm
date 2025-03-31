import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ItemsModule } from './items/items.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// to replace the uri string by the one from the .env file
const uri = 'mongodb://localhost:27017/cri-v3';

@Module({
  imports: [
    UserModule,
    OrderModule,
    ItemsModule,
    DatabaseModule,

    MongooseModule.forRoot(uri),
    ConfigModule.forRoot({
      isGlobal: true,
    }),


  ]
})
export class AppModule { }
