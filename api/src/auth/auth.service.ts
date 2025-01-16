import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { DrizzleAsyncProvider } from '@app/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as sc from '../../libs/drizzle/schema';
import { eq } from 'drizzle-orm';
import { RegisterUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof sc>,
  ) {}

  generateJwt(payload: { sub: string; email: string }) {
    return this.jwtService.sign(payload);
  }

  async signIn(user: { email: string; name?: string }) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    // Ensure the user has a name
    if (!user.name) {
      throw new BadRequestException('Name is required for new users');
    }

    // Check if the user exists
    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      // Register the user with a guaranteed name
      return this.registerUser({ email: user.email, name: user.name });
    }

    // Generate JWT for the existing user
    return this.generateJwt({
      sub: userExists.id.toString(), // Convert ID to string
      email: userExists.email,
    });
  }

  async registerUser(user: RegisterUserDto) {
    try {
      // Insert the new user into the database
      const [newUser] = await this.db
        .insert(sc.user)
        .values({
          email: user.email,
          name: user.name,
        })
        .returning();

      // Generate JWT for the new user
      return this.generateJwt({
        sub: newUser.id.toString(), // Convert ID to string
        email: newUser.email,
      });
    } catch (error) {
      console.error('Error registering user:', error);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.db.query.user.findFirst({
        where: eq(sc.user.email, email),
      });

      return user || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new InternalServerErrorException('Failed to find user');
    }
  }
}
