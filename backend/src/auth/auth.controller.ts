import { Controller, Post, Body, UnauthorizedException, Logger, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { identifier: string; password: string }) {
    this.logger.debug(`Tentative de connexion avec l'identifiant: ${loginDto.identifier}`);
    
    if (!loginDto.identifier || !loginDto.password) {
      this.logger.debug('Identifiant ou mot de passe manquant');
      throw new BadRequestException('L\'identifiant et le mot de passe sont requis');
    }

    try {
      const user = await this.authService.validateUser(loginDto.identifier, loginDto.password);
      
      if (!user) {
        this.logger.debug('Échec de la validation des identifiants');
        throw new UnauthorizedException('Identifiants invalides');
      }

      this.logger.debug('Connexion réussie, génération du token');
      const result = await this.authService.login(user);
      this.logger.debug('Token généré avec succès');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la connexion:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Erreur lors de la connexion');
    }
  }

  @Post('register')
  async register(@Body() registerDto: Partial<User>) {
    this.logger.debug(`Tentative d'inscription avec l'email: ${registerDto.email}`);
    
    if (!registerDto.username || !registerDto.email || !registerDto.password) {
      this.logger.debug('Données d\'inscription incomplètes');
      throw new BadRequestException('Tous les champs sont requis');
    }

    try {
      const result = await this.authService.register(registerDto);
      this.logger.debug('Inscription réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  }
} 