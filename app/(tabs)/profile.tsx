import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import * as FileSystem from 'expo-file-system';
import { useBoundStore } from "../../store/useStore";

interface JsonData {
    [key: string]: any;
}

const Profile = () => {

    const syncMetadata = useBoundStore((state) => state.syncMetadata);
    const setSyncMetadata = useBoundStore((state) => state.setSyncMetadata);


    const handleConfig = async (): Promise<void> => {
        const FILE_PATH = FileSystem.cacheDirectory;
        const localMetaPath = `${FILE_PATH}local_metadata.json`;
        let localMetaData: JsonData = {};

        const localMetaExists = await FileSystem.getInfoAsync(localMetaPath);
        if (localMetaExists.exists) {
            const localMetaContent = await FileSystem.readAsStringAsync(localMetaPath);
            localMetaData = JSON.parse(localMetaContent);
        }

        console.log(localMetaData);
    }

    // useEffect(() => {
    //     handleConfig();
    // }, []);

    return (
        <SafeAreaView>
            <Text>Book Profiles</Text>
            <Text>{syncMetadata}</Text>
            <Button onPress={() => setSyncMetadata('hehe')} title="测试"></Button>
        </SafeAreaView>
    );
}

export default Profile;