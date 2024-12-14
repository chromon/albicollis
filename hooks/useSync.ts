import { useCallback, useState } from "react"
import * as FileSystem from 'expo-file-system';
import { createBookDirectory, createBookMetadata, deleteRemoteFile, downloadBookFile } from "../fn/bookManager";

interface JsonData {
    [key: string]: any;
}

export const useSync = (initialValue: string = '') => {

    const [metadata, setMetadata] = useState(initialValue);
    const BASE_URL = 'http://10.0.2.2:8080/';

    const syncMetadata = useCallback(async () => {

        const METADATA_URL = `${BASE_URL}metadata`;
        try {
            setMetadata('拉取远程元数据信息');
            // fetch metadata.json from remote server
            const response = await fetch(METADATA_URL);
            const remoteMetaData: JsonData = await response.json();

            for (const key in remoteMetaData) {
                console.log(key);                       // 20241120_160427_7b4d2060
                console.log(remoteMetaData[key]);       // {"name": "我与地坛.txt", "size": 28182, "type": "text/plain"}
                console.log(remoteMetaData[key].name);  // 我与地坛.txt

                // create book directory before download
                createBookDirectory(key);
                // download file from remote server
                downloadBookFile(key, remoteMetaData[key].name);
                // delete metadata from remote server
                deleteRemoteFile(key);
                // create local metadata.json
                createBookMetadata(key, remoteMetaData[key].name);
            }
            setMetadata('更新本地元数据信息成功');
        } catch (error) {
            console.error('Error during sync:', error);
            setMetadata('同步元数据信息失败，请稍后重试。');
        }
    }, []);

    return {
        metadata,
        syncMetadata,
    }
}