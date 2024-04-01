/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
import { FacebookService } from './facebook.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly facebookService: FacebookService,
  ) {}

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUpDto.email);
    if (userExists) throw new BadRequestException('Email is not available.');
    userSignUpDto.password = await hash(userSignUpDto.password, 10);
    let user = this.usersRepository.create(userSignUpDto);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const userExists = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignInDto.email })
      .getOne();
    if (!userExists) throw new BadRequestException('Bad credentials.');
    const matchPassword = await compare(
      userSignInDto.password,
      userExists.password,
    );
    if (!matchPassword) throw new BadRequestException('Bad credentials.');
    delete userExists.password;
    return userExists;
  }

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
    );
  }

  async createFacebookPost(user: UserEntity, message: string) {
    // Get Facebook access token for the user
    const accessToken = await this.accessToken(user);
    // Call the Facebook service to create a post
    return this.facebookService.createPost(accessToken, message);
  }

  async getFacebookPosts(user: UserEntity) {
    // Get Facebook access token for the user
    const accessToken = await this.accessToken(user);
    // Call the Facebook service to get posts
    return this.facebookService.getPosts(accessToken);
  }

  async deleteFacebookPost(user: UserEntity, postId: string) {
    // Get Facebook access token for the user
    const accessToken = await this.accessToken(user);
    // Call the Facebook service to delete a post
    return this.facebookService.deletePost(accessToken, postId);
  }
}
