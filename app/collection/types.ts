export type CollectionType = {
  title: string;
  type: string;
  objectKey: "channels";
  capitalize?: boolean;
  handleDelete: (id: string) => Promise<string | null>;
};
