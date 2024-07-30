import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Folder {
  id: number;
  name: string;
}

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
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload);
    },
    removeFolder: (state, action: PayloadAction<number>) => {
      state.folders = state.folders.filter((folder) => folder.id !== action.payload);
    },
  },
});

export const { addFolder, removeFolder } = foldersSlice.actions;
export default foldersSlice.reducer;
