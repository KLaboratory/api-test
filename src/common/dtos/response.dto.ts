import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsObject } from 'class-validator';

/**
 * Dto Response implements
 *
 * @author bcueva
 * @version 1.0.0
 */
export class ResponseDto<T> {
  @IsNumber()
  @ApiProperty({
    description: 'Status code of response',
  })
  statusCode: number;

  @IsString()
  @ApiProperty({
    description: 'Message of response',
  })
  message: string;

  @IsObject()
  @ApiProperty({
    description: 'Result data',
  })
  data: T;
}
