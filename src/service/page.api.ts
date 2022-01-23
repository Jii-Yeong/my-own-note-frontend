import axios from "axios"
import { Page } from "./types/page"

export const getAllPageList = (userId: string) => {
  const data = {
    userId: userId
  }
  return axios.post('/api/page/select/all', data).then(response => response.data);
};

export const addPage = (pageInfo: Page) => {
  return axios.post('api/page/insert', pageInfo).then(response => response.data);
}

export const getPageContent = (pageId: number, title: string) => {
  const data = {
    pageId: pageId,
    title: title,
  }
  return axios.post('/api/page/select/id', data).then(response => response.data);
}

export const addPageContent = (pageId: number, textList: Array<string>) => {
  const data = {
    pageId: pageId ?? 0,
    text: textList,
  }
  return axios.post('api/page/insert/content', data).then(response => response.data);
}

export const removePage = (pageId: number) => {
  return axios.delete(`api/page/delete?pageId=${pageId}`).then(response => response.data);
}