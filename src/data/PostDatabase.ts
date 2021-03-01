import dayjs from "dayjs";
import { Post, Tag, PostFinal } from "../business/entities/Post";
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private static tablePosts = "photomet_posts";
  private static tableTags = "photomet_tags";
  private static tagsPosts = "tags_posts";

  private static toPostModel(post: any): PostFinal{
    return new PostFinal(
      post.id,
      post.subtitle,
      dayjs(post.date).format("DD/MM/YYYY"),
      post.file,
      post.collection,
      post.name,
      post.author_id,
      post.nickname,
      post.profilePicture
    );
  }

  public async createPost(post: Post, tag: Tag) {
    try {
      await BaseDatabase.connection
        .insert({
          id: post.id,
          subtitle: post.subtitle,
          date: post.date,
          file: post.file,
          collection: post.collection,
          author_id: post.author_id
        })
        .into(PostDatabase.tablePosts);

      await BaseDatabase.connection
        .insert({
          id: tag.id,
          author_id: tag.author_id,
          name: tag.name
        })
        .into(PostDatabase.tableTags);

      await BaseDatabase.connection
        .insert({
            post_id: post.id,
            tag_id: tag.id
        })  
        .into(PostDatabase.tagsPosts)


    } catch (error) {
      throw new CustomError(500, "Deu ruim rapá");
    }
  }

  public async selectAll(): Promise<any>{
    try {
      const result = await BaseDatabase.connection.raw(`
      SELECT post.id,
             post.subtitle,
             post.date,
             post.file,
             post.collection,
             tag.name,
             post.author_id, 
             user.nickname,
             user.profilePicture
      FROM photomet_posts post
      RIGHT JOIN photomet_users user
      ON post.author_id = user.id
      LEFT JOIN photomet_tags tag
      ON tag.author_id = post.author_id
      JOIN tags_posts pt
      ON pt.tag_id = tag.id 
      AND pt.post_id = post.id
      ORDER BY date  DESC;
      `);

      let postArray: PostFinal[] = []

      for(let item of result[0]){
        postArray.push(PostDatabase.toPostModel(item))

      }

      return postArray
  
    } catch (error) {
       throw new Error(error.sqlmessage || error.message);
    }
  }
}