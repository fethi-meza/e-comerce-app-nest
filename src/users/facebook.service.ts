/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FacebookService {
  async createPost(accessToken: string, message: string) {
    try {
      //replec the link with to your link :: feed and me
      const response = await axios.post(`https://graph.facebook.com/me/feed`, {
        message: message,
        access_token: process.env.accessTokenPageFacbook,
      });
      return response.data;
    } catch (error) {
      throw new BadRequestException('Failed to create post on Facebook.');
    }
  }

  async getPosts(accessToken: string) {
    try {
      const response = await axios.get(`https://graph.facebook.com/me/feed`, {
        params: {
          access_token: accessToken,
        },
      });
      return response.data.data;
    } catch (error) {
      throw new BadRequestException('Failed to fetch posts from Facebook.');
    }
  }

  // eslint-disable-next-line prettier/prettier
  async deletePost(accessToken: string, postId: string) {
    try {
      const response = await axios.delete(
        `https://graph.facebook.com/${postId}`,
        {
          params: {
            access_token: accessToken,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException('Failed to delete post on Facebook.');
    }
  }
}
