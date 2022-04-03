import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(20)
  @MinLength(5)
  @Matches(/^[a-zA-z0-9]*$/, {
    message: `password only allow english and number`,
  })
  @IsNotEmpty()
  password: string;
}
