export interface MotherDuckConfigRequest {
    motherduck_api_key?: string,
    destination_path?: string,
    schema?: string,
    destinationType?: string
    workspaceId: string
  }
  
  export interface CoinAPICONFIG {
       api_key: string,
       symbol_id: string,
       period?: string
  }
  
  export interface SyncCONFIG {
      workspaceId?: string
      destinationId?: string,
      sourceId?: string
  }
  
  export interface MotherDuckConfigRequest {
    motherduck_api_key?: string,
    destination_path?: string,
    schema?: string,
    destinationType?: string
    workspaceId: string
  }
  
  export interface CoinAPICONFIG {
       api_key: string,
       symbol_id: string,
       period?: string
  }
  
  export interface SyncCONFIG {
      workspaceId?: string
      destinationId?: string,
      sourceId?: string
  }
  

  export interface TokenRequest {
    client_id: string;
    client_secret: string;
    grant_type?: string; 
  }
 
  export interface TokenResponse {
    access_token: string;
  }
 
  export interface MotherDuckConfigRequest {
    motherduck_api_key?: string,
    destination_path?: string,
    schema?: string,
    destinationType?: string
    workspaceId: string
  }
 