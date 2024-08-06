export interface Destination {
  id: number;
  name: string;
  image: string;
  votes: number;
  voted?: boolean;
}

export interface Folder {
  id: number;
  name: string;
  description: string;
  recent_image?: string;
  images: string[];
  folder_key: string;
}

export interface FolderWithDestinations extends Destination {
  folderName?: string;
  destinations?: string;
}
