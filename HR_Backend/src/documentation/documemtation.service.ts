import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService, private s3Service: S3Service) {}

  async getAll(id: number) {
    const employeeDocuments = await this.prisma.employee.findMany({
      where: { id },
      include: { documents: true },
    });

    const documents = employeeDocuments.map((emp) => {
      const { documents, ...empData } = emp;
      return { documents };
    });
    return documents;
  }
  async upload(files: Array<Express.Multer.File>, id: number) {
    // check if document already exists

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const { fieldname, originalname, mimetype } = file;
        const url = await this.s3Service.uploadFile(
          file,
          `${fieldname}/${originalname}`,
        );
        return {
          name: originalname,
          type: mimetype,
          date: new Date(),
          url,
        };
      }),
    );

    const employee = await this.prisma.employee.update({
      where: { id },
      data: {
        documents: {
          create: uploadedFiles.map((file) => {
            const { name, type, date, url } = file;
            return {
              name,
              type,
              dateOfUpload: date,
              url,
            };
          }),
        },
      },
    });

    return { status: 201, data: employee };
  }


  async delete(documentId: number) {
    try {
      // Check if document exists
      const document = await this.prisma.document.findUnique({
        where: { id: documentId },
      });

      if (!document) {
        return false; // Document not found
      }


      // Delete document from database
      await this.prisma.document.delete({
        where: { id: documentId },
      });

      return true; // Deletion successful
    } catch (error) {
      console.error('Error deleting document:', error);
      return false; // Error occurred during deletion
    }
  }

}
