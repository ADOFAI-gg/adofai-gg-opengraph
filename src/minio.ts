import Minio from 'minio'
import { promisify } from 'util'

const minioClient = new Minio.Client({
  endPoint: process.env.S3_ENDPOINT!,
  accessKey: process.env.S3_ACCESS_KEY!,
  secretKey: process.env.S3_SECRET_KEY!,
})

export const s3Bucket = process.env.S3_BUCKET!

const bucketExists = promisify(minioClient.bucketExists.bind(minioClient))

if (!(await bucketExists(s3Bucket))) {
  throw new Error('Bucket does not exist')
}

export const getObject = promisify(minioClient.getObject.bind(minioClient))

export const putObject = promisify(minioClient.putObject.bind(minioClient))

export { minioClient }
