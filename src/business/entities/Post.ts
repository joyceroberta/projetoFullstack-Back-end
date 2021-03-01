export class Post {
  constructor(
    public readonly id: string,
    public readonly subtitle: string,
    public readonly date: string,
    public readonly file: string,
    public readonly collection: string,
    public readonly author_id: string
  ) {}
}

export interface PostInputDTO {
  subtitle: string,
  file: string,
  collection: string,
  name: string[]
}

export interface Tag {
  id: string;
  author_id: string;
  name: string[];
}

// export interface PostIdInputDTO{
//   token: string,
//   id: string
// }


export class PostFinal {
  constructor(
    public readonly id: string,
    public readonly subtitle: string,
    public readonly date: string,
    public readonly file: string,
    public readonly collection: string,
    public readonly name: string[],
    public readonly author_id: string,
    public readonly nickname: string,
    public readonly profilePicture: string
  ) {}

}

export interface PostFeed {
  id: string,
  subtitle: string,
  file: string,
  name: string[],
  author_id: string,
  nickname: string,
  profilePicture: string
}