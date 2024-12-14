import { StateCreator } from "zustand";

export interface SyncMetadataSlice {
    syncMetadata: string,
    setSyncMetadata: (newSyncInfo: string) => void
}

export const createSyncMetadataSlice: StateCreator<SyncMetadataSlice> = (set) => ({
    syncMetadata: '',
    setSyncMetadata: (newSyncMetadata) => set((state) => ({syncMetadata: newSyncMetadata})),
});