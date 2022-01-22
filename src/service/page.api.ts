import axios from "axios"
import { Page } from "./types/page"

export const getAllPageList = (userId: number) => {
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

export const addPageContent = (pageId: number, text: string, index: number) => {
  const data = {
    pageId: pageId ?? 0,
    text: text,
    index: index ?? 0,
  }
  console.log("data",data);
  return axios.post('api/page/insert/content', data).then(response => response.data);
}

export const removePageContentToIndex = (index: number) => {
  return axios.delete(`api/page/delete/index?index=${index}`).then(response => response.data);
}