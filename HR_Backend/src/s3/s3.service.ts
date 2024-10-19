import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private region: string;
  private s3: S3Client;

  constructor(private config: ConfigService) {
    this.region = config.get<string>('S3_REGION') || 'us-west-2';
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: config.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: config.get<string>('S3_SECRET_KEY'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, key: string) {
    const bucket = this.config.get<string>('S3_BUCKET_NAME');
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    try {
      const response: PutObjectCommandOutput = await this.s3.send(
        new PutObjectCommand(input),
      );

      if (response.$metadata.httpStatusCode === 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
      }
      throw new Error('Image not uploaded to s3');
    } catch (e) {
      throw e;
    }
  }
  
}
