export type CollectionType = {
  title: string;
  type: string;
  objectKey: "channels" | "boardGames" | "authors";
  capitalize?: boolean;
  handleDelete: (id: string) => Promise<string | null>;
};
