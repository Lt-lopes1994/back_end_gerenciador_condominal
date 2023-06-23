export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirm: string;
  readonly door: number;
  readonly tower: string;
}
