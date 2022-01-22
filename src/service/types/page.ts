export type Page = {
  title: string;
  userId: string;
}

export type PageContentInsertRequest = {
  currentPageId: number;
  textList: Array<string>;
}