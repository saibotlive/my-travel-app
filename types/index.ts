export interface Destination {
  id: number;
  name: string;
  image: string;
  votes: number;
}

export interface Folder {
  id: number;
  name: string;
  description: string;
  recent_image?: string;
  images: string[];
}

export interface FolderWithDestinations extends Destination {
  folderName?: string;
  destinations?: string;
}
