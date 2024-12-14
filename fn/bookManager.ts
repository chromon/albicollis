import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

interface Bookmark {
    chapter: number;
    position: number;
    note?: string;
}

interface LastReadPosition {
    chapter: number;
    position: number;
}

interface BookMetadata {
    id: string;
    title: string;
    author: string;
    coverImage: string;
    lastReadPosition: LastReadPosition;
    bookmarks: Bookmark[];
    lastUpdated: string;
}

// const BASE_PATH = `${FileSystem.documentDirectory}books/`;
const BASE_PATH = `${FileSystem.cacheDirectory}books/`;
const BASE_URL = 'http://10.0.2.2:8080/';

/*

FileSystem.documentDirectory/
└── books/
    └── [book_id]/
        ├── content/
        │   ├── book.epub
        │   └── extracted/
        │       ├── chapter1.html
        │       ├── chapter2.html
        │       └── ...
        └── metadata.json

const bookMetadata = {
    id: 'unique_book_id',
    title: 'Book Title',
    author: 'Author Name',
    coverImage: 'path/to/cover.jpg',
    lastReadPosition: {
        chapter: 2,
        position: 0.35  // 表示在第2章的35%位置
    },
    bookmarks: [
        { chapter: 1, position: 0.15, note: 'Interesting quote' },
        { chapter: 3, position: 0.5, note: 'Remember this part' }
    ],
    lastUpdated: new Date().toISOString()
};
*/
export const createBookDirectory = async (fileId: string): Promise<void> => {
    const bookDir = `${BASE_PATH}${fileId}/`;
    // const contentDir = `${bookDir}content/`;
    // const extractedDir = `${contentDir}extracted/`;

    try {
        await FileSystem.makeDirectoryAsync(bookDir, { intermediates: true });
        console.log('book directory created successfully');
    } catch (error) {
        console.error('error creating book directory:', error);
        throw error;
    }

    console.log('Creating directory at:', bookDir);

    try {
        const fileInfo = await FileSystem.getInfoAsync(bookDir);
        console.log('File info:', fileInfo);
    } catch (error) {
        console.error('Detailed error:', {
            message: error instanceof Error ? error.message : 'unknown error',
            path: bookDir
        });
        throw error;
    }
}

export const downloadBookFile = async (fileId: string, filename: string): Promise<void> => {
    try {
        const extension = filename.split('.').pop();
        const downloadUrl = `${BASE_URL}${fileId}`;
        const destinationUri = `${BASE_PATH}${fileId}/${fileId}${extension}`;

        // config download options
        const downloadResumable = FileSystem.createDownloadResumable(
            downloadUrl, destinationUri, {}, () => { }
        );

        // start download from remote
        const result = await downloadResumable.downloadAsync();
        if (!result?.uri) {
            throw new Error('download failed: file URI not retrieved');
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'unknown error';
        Alert.alert("download failed", errorMessage, [{ text: "confirm" }]);
    }
};

export const deleteRemoteFile = async (fileId: string): Promise<void> => {
    const DELETE_URL = `${BASE_URL}delete/${fileId}`;
    const response = await fetch(DELETE_URL);
    // console.log(response);
}

export const createBookMetadata = async (fileId: string, filename: string): Promise<void> => {
    const metadataPath = `${BASE_PATH}${fileId}/metadata.json`;

    try {
        // create metadata json file
        const metadata: BookMetadata | null = {
            id: fileId,
            title: filename,
            author: '',
            coverImage: '',
            lastReadPosition: { chapter: 0, position: 0 },
            bookmarks: [],
            lastUpdated: new Date().toISOString()
        };

        await FileSystem.writeAsStringAsync(
            metadataPath,
            JSON.stringify(metadata, null, 2)
        );

        console.log('create metadata successfully');
    } catch (error) {
        console.error('error creating metadata:', error);
        throw error;
    }
}

export const getBookMetadata = async(fileId: string): Promise<BookMetadata | null> => {
    const metadataPath = `${BASE_PATH}${fileId}/metadata.json`;
    
    try {
      const metadataString = await FileSystem.readAsStringAsync(metadataPath);
      return JSON.parse(metadataString);
    } catch (error) {
      console.error('error reading metadata:', error);
      return null;
    }
  }
