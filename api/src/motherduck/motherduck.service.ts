import { Injectable } from '@nestjs/common';
import { Database } from "duckdb-async";

@Injectable()
export class MotherduckService {
    private async createMotherDuck() {
        try {
            const token = process.env.MOTHERDUCK_API_TOKEN;

            if (!token) {
                throw new Error("MOTHERDUCK_API_TOKEN is not defined in environment variables.");
            }

            const db = await Database.create("md:airbyte", {
                'motherduck_token': token,
                'custom_user_agent': 'INTEGRATION_NAME'
            });
            const con = await db.connect();
            console.log('MD Connection established -->', con);
            return con;
        } catch (error) {
            console.error('Error in createMotherDuck:', error.message);
            throw error; 
        }
    }

    public async fetchdb() {
        try {
            const db = await this.createMotherDuck();
            return db;
        } catch (error) {
            console.error('Error in fetchdb:', error.message);
            throw error; 
        }
    }


}
