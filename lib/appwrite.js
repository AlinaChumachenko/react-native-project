import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query
   
  } from "react-native-appwrite";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.rn.aora',
    projectId: '6718c1ac0025add8f12e',
    databaseId: '6718cb6900232e64db44',
    userCollectionId: '6718cc34000736d400b2',
    videosCollectionId: '6718cd99001ac1fa1a77',
    storageId: '671921de001e443fd9e0'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      )  

      if(!newAccount) throw Error;

      const avatarUrl= avatars.getInitials(username);

      await signIn(email, password);

      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
      )

      return newUser;
    } catch (error) {
        console.log(error);    
        throw new Error(error);
    }
};

export const signIn = async (email, password) =>{
    try {
      const session = await account.createEmailPasswordSession(email, password)
      
      return session;
    } catch (error) {
        console.log(error);    
        throw new Error(error);
    }

}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.getDocument(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);  
    }
}