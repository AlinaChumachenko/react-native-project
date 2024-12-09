import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm.sora',
  projectId: '660d0e00da0472f3ad52',
  storageId: '660d0e59e293896f1eaf',
  databaseId: '660d14b2b809e838959a',
  userCollectionId: '660d14c0e8ae0ea842b8',
  videoCollectionId: '660d157fcb8675efe308',
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      },
    );

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(error.message || 'Failed to create user');
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    if (error.code === 401) {
      throw new Error('Invalid email or password');
    }
    throw new Error(error.message || 'Failed to sign in');
  }
}

// Get Account
export async function getAccount() {
  try {
    return await account.get();
  } catch (error) {
    console.error('Error getting account:', error);
    throw new Error('Failed to get account');
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    );

    if (!currentUser.documents.length) {
      throw new Error('User not found');
    }

    return currentUser.documents[0];
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw new Error('Failed to fetch current user');
  }
}

// Sign Out
export async function signOut() {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out');
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file || !file.mimeType) {
    throw new Error('Invalid file or missing mimeType');
  }

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file,
    );
    return await getFilePreview(uploadedFile.$id, type);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  try {
    if (type === 'video') {
      return storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === 'image') {
      return storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        'top',
        100,
      );
    } else {
      throw new Error(`Unsupported file type: ${type}`);
    }
  } catch (error) {
    console.error('Error getting file preview:', error);
    throw new Error('Failed to get file preview');
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      },
    );
  } catch (error) {
    console.error('Error creating video post:', error);
    throw new Error('Failed to create video post');
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
    );
    return posts.documents;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal('creator', userId)],
    );
    return posts.documents;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw new Error('Failed to fetch user posts');
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search('title', query)],
    );
    if (!posts.documents.length) {
      throw new Error('No matching posts found');
    }
    return posts.documents;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw new Error('Failed to search posts');
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)],
    );
    return posts.documents;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    throw new Error('Failed to fetch latest posts');
  }
}
