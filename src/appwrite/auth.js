
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });


export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)                      // Your API Endpoint
            .setProject( conf.appwriteProjectId);               // Your project ID

            this.account = new Account(this.client);

          }
                    // SignUp

            async createAccount({email,password,name}){       
                try{
                   const userAccount = await this.account.create(ID.unique(), email,password,name);
                    if(userAccount){
                        // call Login method
                       return this.login({email,password})
                    }
                    else{
                        return userAccount;
                    }
                }

                catch(error){
                       throw error;
                }
            }

          
             // Login
           
        async login({email,password}){         
            try {
                return await this.account.createEmailSession(email,password); // refer by appwrite docs
            }                                                                 // yha pr hmko SESSION as RETURN milta h
            catch(error){
                    throw error;
            }
           }
         
           // Current User
        async getCurrentUser(){
            try {
              return  await this.account.get();  // To Get the currently logged in user.
            }
            catch(error){
                 console.log("Appwrite Service :: getCurrentUser :: error",error);
            }
            
            return null;
        }   
           
        //Logout
        async logout(){
            try {
                 await this.account.deleteSessions();
            } catch (error) {
                console.log("Appwrite Service :: logout :: error",error);
            }
        }

}

const authService = new AuthService();

export default authService;