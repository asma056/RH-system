import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { MailService } from 'src/service/email/mail.service';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/updatePassword';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private mail: MailService) {}

  private async userWithIdExists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return !!user;
  }

  async getAll() {
    const users = await this.prisma.user.findMany({
      where:{
        role: {
          in: ['SUPER_ADMIN', 'ADMIN']
        }
        },
      select: {
        email: true,
        actived: true,
        companyId: true,
        id: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
    console.log("users ===>",users)
    return users.map((item) => ({
      ...item,
      createdAt: new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(item.createdAt),
    }));
  }

  async get(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        actived: true,
        companyId: true,
        id: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new HttpException(
        `Usuário com id ${id} nâo encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(user);
    return {
      ...user,
      createdAt: new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(user.createdAt),
    };
  }

  async create(body: CreateUserDto) {
    const { name, email, company_id, password, refresh_token, role } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const companyExists = await this.prisma.company.findUnique({
      where: {
        id: company_id,
      },
    });

    const userWithEmailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!companyExists) {
      throw new HttpException(
        'Empresa com id informando não existe!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userWithEmailExists) {
      throw new HttpException(
        'Já existe usuário com este email cadastrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        company: { connect: { id: company_id } },
        refreshToken: refresh_token,
        role,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      company_id: user.companyId,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async update(id: number, body: UpdateUserDto) {

    if (!this.userWithIdExists(id)) {
      throw new HttpException(
        `Usuário com id ${id} nâo encontrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: body,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      company_id: user.companyId,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async delete(id: number) {
    if (!this.userWithIdExists(id)) {
      throw new HttpException(
        `Usuário com id ${id} nâo encontrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        actived: false,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      company_id: user.companyId,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async findByEmail(email: string) {
    console.log('Find by email');
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }


  async updatePassword(id: number,body:UpdatePasswordDto) {
    const {currentPassword,newPassword}=body ;
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);


    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    bcrypt.compare(currentPassword, user.password, async (err, result) => {
      if (err) {
        console.error("Erreur lors de la comparaison des mots de passe :", err);
        return; // Sortie de la fonction en cas d'erreur
      }
    
      console.log("Résultat de la comparaison des mots de passe :", result);
    
      if (result) {
        try {
          const userUpdated = await this.prisma.user.update({
            where: { id },
            data: {
              password: hashedNewPassword
            }
          });
          console.log("Utilisateur mis à jour :", userUpdated);
          return userUpdated;
        } catch (updateError) {
          console.error("Erreur lors de la mise à jour de l'utilisateur :", updateError);
          // Vous pouvez décider ici de renvoyer un message d'erreur ou de gérer autrement cette situation
        }
      } else {
        console.log("Le mot de passe actuel est incorrect.");
        // Vous pouvez décider ici de renvoyer un message à l'utilisateur ou de gérer autrement cette situation
      }
    });
    
  
}

}