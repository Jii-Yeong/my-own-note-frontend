export type Page = {
  title: string;
  userId: string;
}

export type PageContentTextList = {
  text: string;
  style: string;
}

export type PageContentInsertRequest = {
  currentPageId: number;
  textList: Array<PageContentTextList>;
}