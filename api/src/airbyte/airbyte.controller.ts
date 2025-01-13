import { Body, Controller, Get, Post } from '@nestjs/common';
import { AirbyteService } from './airbyte.service';
import { CoinAPICONFIG, MotherDuckConfigRequest, SyncCONFIG } from './airbyte.dto';

@Controller('airbyte')
export class AirbyteController {
    constructor(private readonly airbyte: AirbyteService){}
    
    @Get('/list_destinations')
    async listDestinations() {
        const token_data = {
            client_id: `${process.env.AIRBYTE_CLIENT_ID}`,
            client_secret:`${process.env.AIRBYTE_SECRET_ACCESS}`
            }
      const destinations = await this.airbyte.listdestination(token_data)
      return {
        data: destinations
      }
    }
  
    @Get('/list_sources')
    async listSources() {
        const token_data = {
            client_id: `${process.env.AIRBYTE_CLIENT_ID}`,
            client_secret:`${process.env.AIRBYTE_SECRET_ACCESS}`
            }
      const sources = await this.airbyte.listsources(token_data)
      return {
        data: sources
      }
    }
  
    @Post('/setup_destination_motherduck')
    async configureDestinationConnection(@Body() config: MotherDuckConfigRequest){
      const token_data = {
        client_id: `${process.env.AIRBYTE_CLIENT_ID}`,
        client_secret:`${process.env.AIRBYTE_SECRET_ACCESS}`
        }
     const config_results = await this.airbyte.configDestinationMDuck(config,token_data)
     return config_results
    }
  
    @Post('/setup_source_coinapi')
    async configureSourceCoinAPI(@Body() config: CoinAPICONFIG){
     const config_results = await this.airbyte.configSourceCoinAPI(config)
     return config_results
    }
  
    @Post('/setup_source_PolygonAPI')
    async configureSourcePolygonAPI(@Body() config: MotherDuckConfigRequest){
      //  const config_results = await this.airbyte.configureDestinationConnection(config)
      //  return config_results
      }
  
      @Post('run_sync')
      async runSycn(@Body() config: SyncCONFIG){
         const sync_results = await this.airbyte.runSync(config)
         return sync_results
        }
}
