export type USER_INFO = {
  id: string | null;
  nickname: string;
  pageName: string;
  isAdditingPage: boolean;
  loginError: string | undefined;
  error: string | undefined;
}