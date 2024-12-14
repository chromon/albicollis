import { create } from "zustand";
import { createSyncMetadataSlice, SyncMetadataSlice } from "./syncMetadataSlice";

export const useBoundStore = create<SyncMetadataSlice>()((...a) => ({
    ...createSyncMetadataSlice(...a),
}))

// usage
// const syncMetadata = useBoundStore((state) => state.syncMetadata);
// const setSyncMetadata = useBoundStore((state) => state.setSyncMetadata);