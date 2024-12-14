import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 定义单个项目的接口
interface Item {
    size: number;
    bookName: string;
    contentType: string;
}

// 定义整个响应的接口
interface ApiResponse {
    [key: string]: Item;
}

const BookReview = () => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (): Promise<void> => {
        try {
            const response = await fetch(`http://10.0.2.2:8080/metadata`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json: ApiResponse = await response.json();
            setData(json);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    };

    const renderData = () => {
        if (!data) return null;
        return Object.entries(data).map(([key, item]) => (
            <View key={key}>
                <Text>Key: {key}</Text>
                <Text>Name: {item.bookName}</Text>
                <Text>Size: {item.size}</Text>
                <Text>Type: {item.contentType}</Text>
            </View>
        ));
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <SafeAreaView>
            <Text>Book Review</Text>
                {renderData()}
                {error && <Text>错误: {error}</Text>}
        </SafeAreaView>
    );
}

export default BookReview;