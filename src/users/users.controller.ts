import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { JwtAuthGuard } from './jwt-auth.guard'; // Assuming you have a JWTAuthGuard for authentication

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(
    @Body() userSignUpDto: UserSignUpDto,
  ): Promise<{ user: UserEntity }> {
    return { user: await this.usersService.signup(userSignUpDto) };
  }

  @Post('signin')
  async signin(@Body() userSignInDto: UserSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
  }> {
    const user = await this.usersService.signin(userSignInDto);
    const accessToken = await this.usersService.accessToken(user);

    return { accessToken, user };
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post('facebook/post')
  async createFacebookPost(@Req() req, @Body() { message }) {
    const userId = req.user.id; // Assuming you have stored user ID in the JWT payload
    const user = await this.usersService.findOne(userId);
    return this.usersService.createFacebookPost(user, message);
  }

  @UseGuards(JwtAuthGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('facebook/posts')
  async getFacebookPosts(@Req() req) {
    const userId = req.user.id; // Assuming you have stored user ID in the JWT payload
    const user = await this.usersService.findOne(userId);
    return this.usersService.getFacebookPosts(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('facebook/post/:id')
  async deleteFacebookPost(@Req() req, @Param('id') postId: string) {
    const userId = req.user.id; // Assuming you have stored user ID in the JWT payload
    const user = await this.usersService.findOne(userId);
    return this.usersService.deleteFacebookPost(user, postId);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }
}
