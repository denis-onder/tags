export interface User {
  _id: string;
  email: string;
  displayName: string;
  password: string;
}

export interface Link {
  _id: string;
  user: string;
  url: string;
  tags: Array<Tag>;
}

export interface Tag {
  _id: string;
  link: string;
  value: string;
}
