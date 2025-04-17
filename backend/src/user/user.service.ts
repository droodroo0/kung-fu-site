import { Injectable, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    this.logger.debug(`Création d'un nouvel utilisateur: ${userData.username}`);
    
    const existingUser = await this.userRepository.findOne({
      where: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      this.logger.debug('Utilisateur existant trouvé');
      throw new ConflictException('Email ou nom d\'utilisateur déjà utilisé');
    }

    const hashedPassword = await hash(userData.password, 10);
    this.logger.debug('Mot de passe hashé créé');
    
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    this.logger.debug(`Utilisateur créé avec l'ID: ${savedUser.id}`);
    return savedUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    this.logger.debug(`Recherche d'utilisateur par email: ${email}`);
    return this.userRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    this.logger.debug(`Recherche d'utilisateur par nom d'utilisateur: ${username}`);
    return this.userRepository.findOne({ where: { username } });
  }

  async findByEmailOrUsername(identifier: string): Promise<User | undefined> {
    this.logger.debug(`Recherche d'utilisateur par identifiant: ${identifier}`);
    const user = await this.userRepository.findOne({
      where: [
        { email: identifier },
        { username: identifier }
      ]
    });
    this.logger.debug(user ? `Utilisateur trouvé avec l'ID: ${user.id}` : 'Aucun utilisateur trouvé');
    return user;
  }

  async findById(id: number): Promise<User> {
    this.logger.debug(`Recherche d'utilisateur par ID: ${id}`);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.debug('Utilisateur non trouvé');
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  async update(id: number, userData: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findById(id);
    if (userData.password) {
      userData.password = await hash(userData.password, 10);
    }
    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    this.logger.debug('Validation du mot de passe');
    try {
      if (!user || !user.password || !password) {
        this.logger.debug('Données manquantes pour la validation du mot de passe');
        return false;
      }

      const isValid = await compare(password, user.password);
      this.logger.debug(`Résultat de la validation: ${isValid}`);
      
      if (!isValid) {
        this.logger.debug('Mot de passe invalide');
      }
      
      return isValid;
    } catch (error) {
      this.logger.error('Erreur lors de la validation du mot de passe:', error);
      return false;
    }
  }
} 