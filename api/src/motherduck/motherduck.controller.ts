import { Controller, Get, Post } from '@nestjs/common';
import { MotherduckService } from './motherduck.service';

@Controller('motherduck')
export class MotherduckController {
   constructor(private readonly md: MotherduckService){}
    @Get('/fetch')
    async getMD(){
        const db = await this.md.fetchdb()
        return db
    }
}
