import { Body, Controller, Get, Post } from '@nestjs/common';
import { MotherduckService } from './motherduck.service';

@Controller('motherduck')
export class MotherduckController {
   constructor(private readonly mdservice: MotherduckService){}
    @Get('/run_query')
    async runQuery(@Body() query: string){
        const db = ''
        return db
    }

    @Get('/run_ai_query')
    async runAIQuery(@Body() query: string){
        const db = ''
        return db
    }

    @Get('/run_ai_query')
    async runcachedQueries(@Body() query: string){
        const db = ''
        return db
    }

    

}
