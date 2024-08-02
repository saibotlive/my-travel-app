import { Folder } from '@/types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FoldersState {
  folders: Folder[];
}

const initialState: FoldersState = {
  folders: [],
};

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    updateFolders: (state, action: PayloadAction<Folder[]>) => {
      state.folders = action.payload;
    },
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload);
    },
    removeFolder: (state, action: PayloadAction<number>) => {
      state.folders = state.folders.filter((folder) => folder.id !== action.payload);
    },
  },
});

export const { updateFolders, addFolder, removeFolder } = foldersSlice.actions;
export default foldersSlice.reducer;
