export interface userDTO {
    email: string,
    name: string
}

export interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
}

export interface JwtPayload {
  userId: number;
  email: string;
  name: string;
}

export class RegisterUserDto {
    email: string;
    name: string;
  }
  