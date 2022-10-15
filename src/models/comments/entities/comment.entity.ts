import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  authorId: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  date: Date; // TODO: Setup for timezone

  @Field(() => [Comment], { nullable: false })
  @OneToMany(() => Comment, (comment) => comment.replyTo)
  replies: Comment[];

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.replies)
  replyTo: Comment | null;

  @Field()
  @Column()
  targetType: string;

  @Field()
  @Column()
  targetId: string;
}
