import { Controller, Get, Param } from '@nestjs/common';
import { ClientApiService } from './client-api.service';

@Controller('item')
export class ItemsController {
  constructor(private readonly clientApiService: ClientApiService) { }

  @Get()
  getAllItems() {
    return this.clientApiService.getAllItems();
  }

  @Get("categories")
  getCategories() {
    return this.clientApiService.getCategories();
  }

  @Get(':id')
  getItem(@Param('id') id: string) {
    console.log('id', id, parseInt(id));

    return this.clientApiService.getItem(id);
  }
}
