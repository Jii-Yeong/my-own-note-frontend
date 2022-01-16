import { PAGE_LIST } from "$src/types/page";
import axios from 'axios';

type FETC_ALL_PAGE_LIST_RESPONSE = {
  pageList: Array<PAGE_LIST>
}

// export const getAllPageList = () => axios.get('/');
export const getAllPageList = () => {
  return {
    pageList: [
      {
        parentPageId: '00',
        pageId: '001',
        pageName: 'd1 페이지1',
        depths: 1,
      },
      {
        parentPageId: '00',
        pageId: '002',
        pageName: 'd2 페이지2',
        depths: 1,
      },
      {
        parentPageId: '00',
        pageId: '003',
        pageName: 'd1 페이지3',
        depths: 1,
      },
      {
        parentPageId: '001',
        pageId: 'p001',
        pageName: 'd2 페이지1',
        depths: 2,
      },
      {
        parentPageId: '002',
        pageId: 'p002',
        pageName: 'd2 페이지2',
        depths: 2,
      },
      {
        parentPageId: '003',
        pageId: 'p003',
        pageName: 'd2 페이지3',
        depths: 2,
      },

      {
        parentPageId: 'p002',
        pageId: 'q001',
        pageName: 'd3 페이지1',
        depths: 3,
      },
      {
        parentPageId: 'p003',
        pageId: 'q002',
        pageName: 'd1 페이지2',
        depths: 3,
      },
      {
        parentPageId: 'p003',
        pageId: 'q003',
        pageName: 'd3 페이지2',
        depths: 3,
      },
    ]
  }
}