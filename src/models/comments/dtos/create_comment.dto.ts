import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentDto {
  @Field()
  @IsNotEmpty({ message: 'Comment content is required' })
  @IsString()
  content: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  replyTo: number | null;

  @Field()
  @IsNotEmpty({ message: 'Target type is required' })
  @IsString()
  targetType: string;

  @Field()
  @IsNotEmpty({ message: 'Target id is required' })
  @IsString()
  targetId: string;
}
