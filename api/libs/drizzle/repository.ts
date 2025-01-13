import { drizzleSchema } from 'drizzle.config';
export default class Repository {
  protected readonly db: typeof drizzleSchema;
  constructor() {
    this.db = drizzleSchema;
  }
}
