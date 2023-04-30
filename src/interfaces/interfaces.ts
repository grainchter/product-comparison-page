export interface IPhoneData {
    name?: string;
    manufacturer?: string;
    releaseYear?: number;
    screenDiagonal?: number;
    manufacturerCountry?: string;
    memory?: number;
    screenRefreshRate?: number;
    nfc?: boolean;
    esim?: boolean;
    wirelessCharger?: boolean;
    price?: number;
    img?: string;
    id: number;
  }
  
  export interface ITitleData {
    name: string;
    engName: string;
  }

  export type TPayload = {
    values: {
      countElementsShow?: number;
      showData?: Array<Object>;
      showTitleData?: Array<Object>;
      hideData?: Array<Object>;
    };
  };