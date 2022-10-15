import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dtos/create_comment.dto';
import { UpdateCommentDto } from './dtos/update_comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly repo: Repository<Comment>,
  ) {}

  async create(comment: CreateCommentDto): Promise<Comment> {
    const { content, replyTo, targetType, targetId } = comment;
    let parentComment: Comment | null = null;

    if (replyTo) {
      parentComment = await this.findOne(replyTo);
    }

    const createdComment = await this.repo.create({
      content,
      replyTo: parentComment,
      targetType,
      targetId,
      replies: [],
      date: new Date(),
      authorId: 'username', // TODO: Inject userId when auth is available
    });

    await this.repo.insert(createdComment);

    return createdComment;
  }

  async findAll(targetType: string, targetId: string): Promise<Comment[]> {
    return this.repo.findBy({
      targetType: Equal(targetType),
      targetId: Equal(targetId),
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.repo.findOne({
      relations: {
        replies: true,
      },
      where: {
        id,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment ${id} not found`);
    }

    return comment;
  }

  async update(id: number, comment: UpdateCommentDto): Promise<Comment> {
    let updatedComment = await this.findOne(id);

    if (!updatedComment) {
      throw new NotFoundException(`Comment ${id} not found`);
    }

    Object.assign(updatedComment, comment);
    updatedComment.edited = true;

    await this.repo.save(updatedComment);

    return updatedComment;
  }

  async remove(id: number): Promise<Comment> {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException(`Comment ${id} not found`);
    }

    await this.repo.remove(comment);

    return { ...comment, id };
  }
}
