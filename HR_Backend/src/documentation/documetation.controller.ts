import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  Get,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor} from '@nestjs/platform-express';
import { DocumentService } from './documemtation.service';
import { ApiConsumes, ApiTags,ApiBody } from '@nestjs/swagger';

@ApiTags('documentation')
@Controller('employee/document/')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get('/:id')
  async getAllDocumentOfEmployee(@Param('id') id: string) {
    const documents = await this.documentService.getAll(+id);
    return { message: 'Got results in console', results: documents };
  }

  @Post('upload/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadDocument(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {
    const fileUpload = await this.documentService.upload(files, +id);

    if (!fileUpload.status) {
      return new HttpException(
        'Failed to upload file',
        HttpStatus.NOT_MODIFIED,
      );
    }
    return {
      message: 'Successfully uploaded documents',
      results: fileUpload.data,
    };
  }

  @Delete('/delete/:documentId') 
  async deleteDocument(@Param('documentId') documentId: string) {
    const deletionStatus = await this.documentService.delete(+documentId);

    if (!deletionStatus) {
      return new HttpException(
        'Failed to delete document',
        HttpStatus.NOT_MODIFIED,
      );
    }

    return {
      message: 'Successfully deleted document',
    };
  }

}
