import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredentialDto;
    const user = this.create({
      username,
      password,
    });
    this.save(user);
    return user;
  }
}
