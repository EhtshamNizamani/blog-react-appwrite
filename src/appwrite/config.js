import { ID, Client, Databases, Query, Storage } from "appwrite";
import conf from "../conf/conf";
class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appWriteUrl).setProject(conf.projectId);
    this.database(this.client);
    this.bucket(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      await this.database.createDocument(
        conf.databaseId,
        conf.collectionId,
        //   ID.Unique()
        slug,
        {
          userId,
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }
}

const service = new Service();
