export type Page = {
  title: string;
  userId: number;
}

export type PageContentInsertRequest = {
  currentPageId: number;
  textList: Array<string>;
}