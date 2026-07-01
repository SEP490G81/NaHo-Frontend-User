

export interface Comment {
  id: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  questionId: string;
  parentId: number | null;
  content: string;
  createdAt: string;
}

