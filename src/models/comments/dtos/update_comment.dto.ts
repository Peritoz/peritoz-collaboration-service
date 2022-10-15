import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentDto {
  @Field()
  @IsNotEmpty({ message: 'Comment content is required' })
  @IsString()
  content: string;
}
