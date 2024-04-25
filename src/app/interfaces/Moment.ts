export interface Moment {
  id?: string;
  title: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  comments?: [{ text: string, username: string }];
}
