
// The Databases service allows you to create structured collections of documents, query and filter lists of documents, 
//and manage an advanced set of read and write access permissions.

import conf from "../conf/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service{

    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)                      // Your API Endpoint
            .setProject(conf.appwriteProjectId);               // Your project ID

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }
    // +++++++++++++++++++++++++  ** POST SERVICES **   +++++++++++++++++++++++++++++++++++++++++++++++++

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
         
    // **** Update Document :  Update a document by its unique ID.(slug) ***** 

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,     
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost:: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,     //
            )
            return true;

        } catch (error) {
            console.log("Appwrite Service :: deletePost:: error", error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )                            //Get a single document by its unique ID. 
            //This endpoint response returns a JSON object with the document data.

        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error);
            return false;
        }
    }
    //Array of query strings generated using the Query class provided by the SDK.
    // Learn more about queries. Only method allowed is select.

    //   **First hmko indexes m key bnani hogi fir query ka use krenge {array m di jati h}
    // **Query.equal("key","value") -	Returns document if attribute is equal to any value in the provided array.
    
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                //paginations - **read docs
                //createdAt; - **read Docs
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error);
            return false;
        }
    }
    // +++++++++++++++++++++++++++  FILE UPLOAD SERVICES **++++++++++++++++++++++++++++++++++++++++++++

    //after you create a {bucket} or have navigated to bucket details, you can access the Files tab 
    // so you can upload,view, delete and update files in the bucket using the Appwrite project's dashboard. 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {           // Delete a file by its unique ID.
                                        //  Only users with write permissions have access to delete this resource.
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        }
        catch (error) {
            console.log("Appwrite Service:: deleteFile:: error", error);
            return false;
        }
    }
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }

}

const appwriteService = new Service();
export default appwriteService;