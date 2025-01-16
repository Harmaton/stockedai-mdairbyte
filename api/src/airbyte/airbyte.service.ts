import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CoinAPICONFIG, MotherDuckConfigRequest, SyncCONFIG, TokenRequest, TokenResponse } from './airbyte.dto';

@Injectable()
export class AirbyteService {
private async generateToken(credentials: TokenRequest) : Promise<TokenResponse>{
   try {
      const options = {
         method: 'POST',
         url: 'https://api.airbyte.com/v1/applications/token',
          headers: {
             'Content-Type': 'application/json',
            'accept': 'application/json'
           },
           data : {
            client_id: credentials.client_id,
            client_secret: credentials.client_secret,
            grant_type: credentials.grant_type || 'client_credentials'
           }
   }
   const response = await axios(options)

   return response.data
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.error('Airbyte token generation failed:', {
           status: error.response?.status,
           message: error.response?.data?.message
         });

         if (error.response?.status === 404) {
            throw new Error('Invalid Airbyte API endpoint');
          } else if (error.response?.status === 400) {
            throw new Error('Invalid credentials format');
          } else if (error.response?.status === 403) {
            throw new Error('Invalid credentials or unauthorized');
          }
        
        throw error;
   }
}}

async listdestination(token_data: TokenRequest){
    try {
      const tokenResponse = await this.generateToken(token_data)

      if (!tokenResponse?.access_token) {
         throw new Error('Failed to obtain access token');
       }
        const options = {
            method: 'GET',
            url: 'https://api.airbyte.com/v1/destinations',
             headers: {
                'Content-Type': 'application/json',
                 'accept': 'application/json',
                'Authorization': `Bearer ${tokenResponse.access_token}`,
              }
      }

      const destinations = await axios(options)
      return destinations.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
         console.error('Airbyte API error:', {
           status: error.response?.status,
           message: error.response?.data?.message
         });
 
         if (error.response?.status === 401) {
           throw new Error('Authentication failed - invalid token');
         }
       }
       throw error;
    }
 }

 async listConnections(token_data: TokenRequest){
   try {
     const tokenResponse = await this.generateToken(token_data)

     if (!tokenResponse?.access_token) {
        throw new Error('Failed to obtain access token');
      }
       const options = {
           method: 'GET',
           url: 'https://api.airbyte.com/v1/connections',
            headers: {
               'Content-Type': 'application/json',
                'accept': 'application/json',
               'Authorization': `Bearer ${tokenResponse.access_token}`,
             }
     }

     const destinations = await axios(options)
     return destinations.data
   } catch (error) {
     if (axios.isAxiosError(error)) {
        console.error('Airbyte API error:', {
          status: error.response?.status,
          message: error.response?.data?.message
        });

        if (error.response?.status === 401) {
          throw new Error('Authentication failed - invalid token');
        }
      }
      throw error;
   }
}

  async listsources(token_data: TokenRequest){
   try {

     const tokenResponse = await this.generateToken(token_data)

     if (!tokenResponse?.access_token) {
        throw new Error('Failed to obtain access token');
      }
     
       const options = {
           method: 'GET',
           url: 'https://api.airbyte.com/v1/sources',
            headers: {
               'Content-Type': 'application/json',
                'accept': 'application/json',
               'Authorization': `Bearer ${tokenResponse.access_token}`,
             }
     }

     const sources = await axios(options)
     return sources.data

   } catch (error) {
     if (axios.isAxiosError(error)) {
        console.error('Airbyte API error:', {
          status: error.response?.status,
          message: error.response?.data?.message
        });

        if (error.response?.status === 401) {
          throw new Error('Authentication failed - invalid token');
        }
      }
      throw error;
   }
}


  async configDestinationMDuck(config: MotherDuckConfigRequest, token_data: TokenRequest){
   try {
      const tokenResponse = await this.generateToken(token_data)
      if (!tokenResponse?.access_token) {
         throw new Error('Failed to obtain access token');
       }
      const options = {
         method: 'POST',
         url: 'https://api.airbyte.com/v1/destinations',
         headers: {
            accept: 'application/json', 
            'content-type': 'application/json',
            'Authorization': `Bearer ${tokenResponse.access_token}`,
         },
         data: {
            name: 'destination-MotherDuck', 
            workspaceId: `${config.workspaceId}`, 
            configuration: {
              destinationType: 'duckdb',
              motherduck_api_key: `${config.motherduck_api_key}`, 
              destination_path: `md:${config.destination_path}`, 
              schema: `${config.schema}`, 
            },
          },
       };
       
       const response = await axios(options)
       return response.data
   } catch (error) {
      console.log(error)
   }
 }

 async configSourceCoinAPI(config: CoinAPICONFIG){
   try {
      const tokenResponse = await this.generateToken({
         client_id: `${process.env.AIRBYTE_CLIENT_ID}`,
         client_secret: `${process.env.AIRBYTE_SECRET_ACCESS}`
      })
      const options = {
         method: 'POST',
         url: 'https://api.airbyte.com/v1/sources',
         headers: {accept: 'application/json',
            'content-type': 'application/json',
            'Authorization': `Bearer ${tokenResponse.access_token}`
         },
         data: {
            api_key: config.api_key,
            configuration: {sourceType: 'coin-api'},
            start_date: '2019-01-01T00:00:00',
            symbol_id: config.symbol_id ,
            environment: `${process.env.COIN_ENVIRONMENT}`
      }
       };
   
       const source = await axios(options)
       return source.data
   } catch (error) {
      console.log(error)
   }
 }

  async configSourcePolygon(){
   try {
      
   } catch (error) {
      
   }
 }

 async configSourceFinanceAPI(){
   try {
      
   } catch (error) {
      
   }
 }

  async runSync(config: SyncCONFIG){
   try {
      const tokenResponse = await this.generateToken({
         client_id: `${process.env.AIRBYTE_CLIENT_ID}`,
         client_secret: `${process.env.AIRBYTE_SECRET_ACCESS}`
      })

      if (!tokenResponse?.access_token) {
         throw new Error('Failed to obtain access token');
       }

      
       const options = {
         method: 'POST',
         url: 'https://api.airbyte.com/v1/connections',
         headers: {
            accept: 'application/json', 
            'content-type': 'application/json',
            'Authorization': `Bearer ${tokenResponse.access_token}`,
         }, data:{
            sourceId: config.sourceId,
            destinationId: config.destinationId,
            schedule: {scheduleType: 'cron', cronExpression: '0 0 * * * ?'}
         }
       }

      const sync = await axios(options)
      return sync.data

   } catch (error) {
      console.log(error)
   }
 }



}
