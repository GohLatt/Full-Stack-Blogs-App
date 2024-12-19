export const APT_URL = "http://localhost:8080/api/v1/";

export interface registerType {
  name: string;
  email: string;
  password: string;
}

export interface loginType {
  email: string;
  password: string;
}

export interface authorType {
  id: string;
  name: string;
}
export interface commentType {
  name: string;
  comment: string;
  _id: string;
}

export interface postType {
  authorData: authorType;
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  comments?: commentType[];
}

export interface postCreateType {
  title: string;
  content: string;
}

export interface postCommentType {
  postId: string;
  comment: string;
}

export interface profileType {
  title: string;
  content: string;
  _id: string;
}
