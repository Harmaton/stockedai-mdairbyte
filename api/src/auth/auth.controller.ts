import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post('/login')
    async Login(){

    }

    @Post('/signup')
    async SignUp(){
        
    }

    @Post('/profile')
    async ProfileDetails(){
        
    }

    @Post('/google-oauth')
    async Google(){
        
    }
}
