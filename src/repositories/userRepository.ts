import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User"

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                email
            }
        });
        return user;
    }

    public async findByUuid(uuid: string): Promise<User | undefined> {
        const user = await this.findOne({
            uuid
        });
        return user;
    }
}

export default UserRepository;
