import { Injectable } from '@nestjs/common';
import { Database } from "duckdb-async";
import { queryDTO } from './md.dto';

@Injectable()
export class MotherduckService {
    private async InitializeMotherduckConnection() {
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
            console.error('Error in Connection:', error.message);
            throw error; 
        }
    }

 // Function to run a SQL query
async runSQLQuery(query: queryDTO ): Promise<any> {
    try {
        // Extract the query string from the passed object
        const q = query.query
        console.log('Received query string: ', q);
        
        // Initialize the connection to the database
        const connection = await this.InitializeMotherduckConnection();
        console.log('Database connection established:', connection);

        // Execute the query
        const result = await connection.all(q);

        // Log the result of the query execution
        console.log('Query executed successfully:', result);

        return result;
    } catch (error) {
        // Log any errors that occur during query execution
        console.error('Error executing query:', error.message);
        throw error;
    }
}

}
