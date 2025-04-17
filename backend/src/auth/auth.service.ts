import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, password: string): Promise<any> {
    this.logger.debug(`Tentative de validation pour l'identifiant: ${identifier}`);
    const user = await this.userService.findByEmailOrUsername(identifier);
    
    if (!user) {
      this.logger.debug('Aucun utilisateur trouvé avec cet identifiant');
      return null;
    }

    const isPasswordValid = await this.userService.validatePassword(user, password);
    this.logger.debug(`Mot de passe valide: ${isPasswordValid}`);

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(userData: any) {
    this.logger.debug(`Tentative d'inscription avec les données: ${JSON.stringify(userData)}`);
    
    // Vérifier si l'email ou le nom d'utilisateur existe déjà
    const existingUserByEmail = await this.userService.findByEmail(userData.email);
    const existingUserByUsername = await this.userService.findByUsername(userData.username);

    if (existingUserByEmail) {
      this.logger.debug(`Email déjà utilisé: ${userData.email}`);
      throw new UnauthorizedException('Cet email est déjà utilisé');
    }

    if (existingUserByUsername) {
      this.logger.debug(`Nom d'utilisateur déjà utilisé: ${userData.username}`);
      throw new UnauthorizedException('Ce nom d\'utilisateur est déjà utilisé');
    }

    const user = await this.userService.create(userData);
    this.logger.debug(`Nouvel utilisateur créé avec l'ID: ${user.id}`);
    return this.login(user);
  }
} 