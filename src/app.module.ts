import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './models/comments/comments.module';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './models/comments/entities/comment.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    CommentsModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DATABASE_HOST'),
          port: config.get<number>('DATABASE_PORT'),
          database: config.get<string>('DATABASE_NAME'),
          entities: [Comment],
          synchronize:
            !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
          username: config.get<string>('DATABASE_USER'),
          password: config.get<string>('DATABASE_PASS'),
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
