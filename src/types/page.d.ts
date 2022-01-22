export type PAGE = {
  pageList: PAGE_LIST,
  currentPageId: number,
  currentIndex: number,
  pageContent: any,
  addPageState: any,
  error: string | undefined;
}

export type PAGE_LIST = {
  pages: Array<PAGES>;
  count: number;
}

export type PAGES = {
  parentPageId: number;
  pageId: number;
  pageName: string;
}

export type PAGE_CONTENT = {
  title: string;
  text: Array<string>
}