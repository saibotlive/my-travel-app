export interface Destination {
  id: number;
  name: string;
  image: string;
  votes: number;
  folder_id: number | null;
}

export interface Folder {
  id: number;
  name: string;
}
