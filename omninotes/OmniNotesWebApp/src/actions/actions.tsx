import { SET_PAGETITLE, Page } from "../types/types";

export const changePageTitle = (bookIndex:number, pageIndex:number, pageTitle: string) => {
    return (dispatch: any) => {
      dispatch({ type: SET_PAGETITLE, payload: { bookIndex, pageIndex, pageTitle } });
    };
  };