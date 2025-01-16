import { Body, Controller, Get, Post } from '@nestjs/common';
import { MotherduckService } from './motherduck.service';
import { queryDTO } from './md.dto';

@Controller('motherduck')
export class MotherduckController {
   constructor(private readonly mdservice: MotherduckService){}

    @Post('/run_query')
    async runQuery(@Body() query: queryDTO){
        const result = await this.mdservice.runSQLQuery(query)
        return result
    }

    @Post('/run_ai_query')
    async runAIQuery(@Body() query: queryDTO){
        const result = await this.mdservice.runAIQuery(query)
        return result
    }   

    @Post('/aggregate')
    async aggregate(){
        
    }

}
