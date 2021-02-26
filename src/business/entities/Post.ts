export class Post {
  constructor(
    public readonly id: string,
    public readonly subtitle: string,
    public readonly date: string,
    public readonly file: string,
    public readonly collection: string,
    public readonly authorId: string
  ) {};

}

export interface PostInputDTO {
  token: string,
  subtitle: string,
  file: string,
  collection: string,
  tag: string[]
}

export interface Tag{
    id: string,
    authorId: string,
    name: string[]
}

// export interface PostIdInputDTO{
//   token: string,
//   id: string
// }


// export class PostFinal {
//   constructor(
//     public readonly id: string,
//     public readonly subtitle: string,
//     public readonly date: string,
//     public readonly file: string,
//     public readonly collection: string,
//     public readonly tags: string[],
//     public readonly authorId: string,
//     public readonly nickname: string,
//     public readonly profilePicture: string
//   ) {}

// }

// export interface PostFeed {
//   id: string,
//   subtitle: string,
//   file: string,
//   tags: string[],
//   authorId: string,
//   nickname: string,
//   profilePicture: string
// }