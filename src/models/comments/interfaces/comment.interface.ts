export interface Comment {
  id: number;
  authorId: string;
  content: string;
  date: Date;
  replyTo: Comment | null;
  targetType: string;
  targetId: string;
}
