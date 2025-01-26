import { ID, Client, Databases, Query, Storage } from "appwrite";
import conf from "../conf/conf";
class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appWriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
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
  async getPost({ slug }) {
    try {
      const post = await this.database.getDocument(
        conf.databaseId,
        conf.collectionId,
        slug
      );
      if (post) {
        return post;
      }
      return null;
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
    }
  }

  async deletePost({ slug }) {
    try {
      await this.database.deleteDocument(
        conf.databaseId,
        conf.collectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await database.updateDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: getListOfPost :: error", error);
      return false;
    }
  }
  async getListOfPost(queries = [Query.equal("status", ["active"])]) {
    try {
      return await database.listDocuments(
        conf.databaseId,
        conf.collectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getListOfPost :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await bucket.createFile(conf.bucketId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.bucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }
  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(conf.bucketId, fileId);
    } catch (error) {
      console.log("Appwrite serive :: createFile :: error", error);

      return false;
    }
  }
}

const service = new Service();
