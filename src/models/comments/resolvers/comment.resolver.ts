import { Comment } from '../entities/comment.entity';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from '../comments.service';
import { CreateCommentDto } from '../dtos/create_comment.dto';
import { UpdateCommentDto } from '../dtos/update_comment.dto';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentsService) {}

  @Mutation(() => Comment, { name: 'createComment' })
  async create(@Args('commentInput') comment: CreateCommentDto) {
    return this.commentService.create(comment);
  }

  @Query(() => [Comment], { name: 'findAllComments' })
  async findAll(
    @Args('targetType') targetType: string,
    @Args('targetId') targetId: string,
  ) {
    return this.commentService.findAll(targetType, targetId);
  }

  @Query(() => Comment, { name: 'findOneComment' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment, { name: 'updateComment' })
  async update(
    @Args('id', { type: () => Int }) id: number,
    @Args('commentInput') comment: UpdateCommentDto,
  ) {
    return this.commentService.update(id, comment);
  }

  @Mutation(() => Comment, { name: 'removeComment' })
  async remove(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id);
  }
}
