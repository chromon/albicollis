import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ListRenderItem, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-actions-sheet';

// interface FileItem {
//     name: string;
//     isDirectory: boolean;
// }

// interface JsonData {
//     [key: string]: any;
// }

// type Status = 'Idle' | 'Listing' | 'Error' | 'Success';

// const BookHome = () => {

//     const [files, setFiles] = useState<FileItem[]>([]);
//     const [status, setStatus] = useState<Status>('Idle');

//     const listFiles = useCallback(async (): Promise<void> => {
//         try {
//             setStatus('Listing');
//             const directory = FileSystem.cacheDirectory;
//             // const directory1 = FileSystem.cacheDirectory;
//             // const directory = `${directory1}books/20241122_162521_d37dfec1/`;
//             console.log(directory);
//             if (!directory) {
//                 throw new Error('Document directory is not available');
//             }

//             const fileList = await FileSystem.readDirectoryAsync(directory);
//             const fileDetails: FileItem[] = await Promise.all(
//                 fileList.map(async (fileName: string): Promise<FileItem> => {
//                     const filePath = `${directory}${fileName}`;
//                     const fileInfo = await FileSystem.getInfoAsync(filePath);
//                     return {
//                         name: fileName,
//                         isDirectory: fileInfo.isDirectory ?? false,
//                     };
//                 })
//             );
//             setFiles(fileDetails);
//             setStatus('Success');
//         } catch (error) {
//             console.error('Error listing files:', error);
//             setStatus('Error');
//         }
//     }, []);

//     useEffect(() => {
//         void listFiles();
//     }, [listFiles]);

//     const renderItem: ListRenderItem<FileItem> = ({ item }) => (
//         <View style={styles.fileItem}>
//             <Text>{item.isDirectory ? '📁' : '📄'} {item.name}</Text>
//         </View>
//     );

//     const loadMetadata = async () => {
//         const FILE_PATH = FileSystem.cacheDirectory;
//         // const localMetaPath = `${FILE_PATH}local_metadata.json`;
//         const localMetaPath = `${FILE_PATH}books/20241122_162521_d37dfec1/metadata.json`;
//         // const localMetaPath = `${FILE_PATH}books/20241122_162521_d37dfec1/我与地坛.txt`;
//         let localMetaData: JsonData = {};

//         const bJsonExists = await FileSystem.getInfoAsync(localMetaPath);
//         if (bJsonExists.exists) {
//             const localMetaContent = await FileSystem.readAsStringAsync(localMetaPath);

//             console.log(localMetaContent);

//             localMetaData = JSON.parse(localMetaContent);
//         } else {
//             // Create an empty b.json if it doesn't exist
//             console.log('local metadata file not exist!');
//         }
//     }

//     const deleteMetadata = async () => {
//         const FILE_PATH = FileSystem.cacheDirectory;
//         const localMetaPath = `${FILE_PATH}流浪地球.txt`;
//         // const localMetaPath = `${FILE_PATH}books/`;
//         const bJsonExists = await FileSystem.getInfoAsync(localMetaPath);
//         if (bJsonExists.exists) {
//             await FileSystem.deleteAsync(localMetaPath);
//             console.log('delete metadata success');
//         } else {
//             console.log('local metadata file not exist!');
//         }
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.status}>Status: {status}</Text>
//             <Button title="Refresh File List" onPress={() => void listFiles()} />
//             <Button title="Load MetaData" onPress={() => void loadMetadata()} />
//             <Button title="Delete MetaData" onPress={() => void deleteMetadata()} />
//             <FlatList
//                 data={files}
//                 renderItem={renderItem}
//                 keyExtractor={(item: FileItem): string => item.name}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     status: {
//         marginBottom: 10,
//     },
//     fileItem: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
// });

interface FileItem {
    name: string;
    uri: string;
    isDirectory: boolean;
}

const BookHome: React.FC = () => {
    const [currentPath, setCurrentPath] = useState<string>(FileSystem.cacheDirectory || '');
    const [items, setItems] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // 读取当前目录内容
    const loadDirectoryContent = async (path: string) => {
        try {
            setLoading(true);
            setError('');

            const result = await FileSystem.readDirectoryAsync(path);
            const fileItems: FileItem[] = await Promise.all(
                result.map(async (name) => {
                    const uri = `${path}${name}`;
                    const info = await FileSystem.getInfoAsync(uri);
                    return {
                        name,
                        uri,
                        isDirectory: info.isDirectory || false,
                    };
                })
            );

            // 排序：目录在前，文件在后，按字母顺序排列
            fileItems.sort((a, b) => {
                if (a.isDirectory === b.isDirectory) {
                    return a.name.localeCompare(b.name);
                }
                return a.isDirectory ? -1 : 1;
            });

            setItems(fileItems);
        } catch (err) {
            setError(`无法读取目录: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    // 处理点击目录
    const handleDirectoryPress = (item: FileItem) => {
        if (item.isDirectory) {
            setCurrentPath(item.uri);
        }
    };

    // 返回上一级目录
    const handleGoBack = () => {
        const parentPath = currentPath.substring(0, currentPath.slice(0, -1).lastIndexOf('/') + 1);
        if (parentPath.startsWith(FileSystem.cacheDirectory || '')) {
            setCurrentPath(parentPath);
        }
    };

    const deleteMetadata = async () => {
        const FILE_PATH = FileSystem.cacheDirectory;
        const localMetaPath = `${FILE_PATH}books/`;
        const bJsonExists = await FileSystem.getInfoAsync(localMetaPath);
        if (bJsonExists.exists) {
            await FileSystem.deleteAsync(localMetaPath);
            console.log('delete metadata success');
        } else {
            console.log('local metadata file not exist!');
        }
    }

    const refreshMetadata = async () => {
        loadDirectoryContent(currentPath);
    }

    // 监听路径变化，重新加载目录内容
    useEffect(() => {
        loadDirectoryContent(currentPath);
    }, [currentPath]);

    return (
        <View style={styles.container}>
            {/* 当前路径显示 */}
            <View style={styles.pathContainer}>
                <Text style={styles.pathText} numberOfLines={1} ellipsizeMode="head">
                    {currentPath}
                </Text>
            </View>

            {/* 返回按钮 */}
            {currentPath !== FileSystem.cacheDirectory && (
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>返回上级目录</Text>
                </TouchableOpacity>
            )}

            {/* 错误提示 */}
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView style={styles.listContainer}>
                    {items.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.item}
                            onPress={() => handleDirectoryPress(item)}
                            // disabled={!item.isDirectory}
                        >
                            <Text style={[styles.itemText, item.isDirectory && styles.directoryText]}>
                                {item.isDirectory ? '📁 ' : '📄 '}{item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            
            <Button title="Delete MetaData" onPress={() => void deleteMetadata()} />
            <Button title="Refresh MetaData" onPress={() => void refreshMetadata()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pathContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    pathText: {
        fontSize: 12,
        color: '#666',
    },
    backButton: {
        padding: 10,
        backgroundColor: '#e0e0e0',
    },
    backButtonText: {
        color: '#007AFF',
        fontSize: 16,
    },
    listContainer: {
        flex: 1,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    directoryText: {
        color: '#007AFF',
    },
    errorText: {
        padding: 20,
        color: 'red',
        textAlign: 'center',
    },
});

export default BookHome;