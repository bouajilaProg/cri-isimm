import { Module } from '@nestjs/common';
import { database } from './database.provider';

@Module({
  providers: [...database],
  exports: [...database],
})
export class DatabaseModule { }
