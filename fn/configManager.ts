import * as FileSystem from 'expo-file-system';

const CONFIG_FILE_NAME = 'appConfig.json';
const CONFIG_FILE_PATH = FileSystem.documentDirectory + CONFIG_FILE_NAME;

// Define a generic type for the config object
type Config = Record<string, any>;

export const ConfigManager = {
    saveConfig: async <T extends Config>(config: T): Promise<void> => {
        try {
            const jsonString = JSON.stringify(config, null, 2);
            await FileSystem.writeAsStringAsync(CONFIG_FILE_PATH, jsonString);
            console.log('Configuration saved successfully');
        } catch (error) {
            console.error('Error saving configuration:', error);
        }
    },

    loadConfig: async <T extends Config>(): Promise<T | null> => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(CONFIG_FILE_PATH);
            if (!fileInfo.exists) {
                console.log('Config file does not exist. Creating with default settings.');
                await ConfigManager.saveConfig<T>({} as T);
                return {} as T;
            }

            const jsonString = await FileSystem.readAsStringAsync(CONFIG_FILE_PATH);
            return JSON.parse(jsonString) as T;
        } catch (error) {
            console.error('Error loading configuration:', error);
            return null;
        }
    },

    updateConfig: async <T extends Config>(updateFunction: (currentConfig: T) => T): Promise<T | null> => {
        try {
            const currentConfig = await ConfigManager.loadConfig<T>();
            if (currentConfig === null) {
                throw new Error('Failed to load current configuration');
            }
            const updatedConfig = updateFunction(currentConfig);
            await ConfigManager.saveConfig<T>(updatedConfig);
            return updatedConfig;
        } catch (error) {
            console.error('Error updating configuration:', error);
            return null;
        }
    },

    deleteConfig: async (): Promise<boolean> => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(CONFIG_FILE_PATH);
            if (fileInfo.exists) {
                await FileSystem.deleteAsync(CONFIG_FILE_PATH);
                console.log('Configuration file deleted successfully');
                return true;
            } else {
                console.log('Configuration file does not exist');
                return false;
            }
        } catch (error) {
            console.error('Error deleting configuration file:', error);
            return false;
        }
    }
};