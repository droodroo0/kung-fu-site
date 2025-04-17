import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: 'Bienvenue sur l\'API du site Kung-Fu',
      status: 'OK',
      endpoints: {
        auth: {
          register: '/api/auth/register',
          login: '/api/auth/login'
        },
        users: '/api/users'
      }
    };
  }
} 