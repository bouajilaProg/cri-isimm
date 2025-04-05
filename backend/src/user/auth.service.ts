import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) { }

  async login(userCode: string, password: string) {

    console.log(process.env.JWT_SECRET)

    const user = await this.userModel.findOne({ userCode: userCode, password }).exec();

    if (user) {
      console.log(user)
      const token = this.jwtService.sign({ userCode: userCode, tel: user.tel, email: user.email, name: user.name });
      console.log(token)
      console.log(this.jwtService.decode(token))

      return { token: token }
    }
    return null

  }

  async checkUserToken(token: string) {

    const payload = this.jwtService.verify(token)
    if (payload) {
      return { ...payload }
    }
    return null

  }

}
