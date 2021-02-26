import { Post, Tag } from "../business/entities/Post";
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private static tablePosts = "photomet_posts";
  private static tableTags = "photomet_tags";
  private static tagsPosts = "tags_posts";

  public async createPost(post: Post, tag: Tag) {
    try {
      await BaseDatabase.connection
        .insert(post)
        .into(PostDatabase.tablePosts);

      await BaseDatabase.connection
        .insert(tag)
        .into(PostDatabase.tableTags);

      await BaseDatabase.connection
        .insert({
            post_id: post.id,
            tag_id: tag.name
        })  
        .into(PostDatabase.tagsPosts)


    } catch (error) {
      throw new CustomError(500, "Deu ruim rapá");
    }
  }

//   public async createTag(tag: Tag) {
//     try {
      
//     } catch (error) {
//       throw new CustomError(500, "Deu ruim rapá");
//     }
//   }


}