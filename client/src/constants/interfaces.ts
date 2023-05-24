export type DeepReadonly<T> = keyof T extends never
  ? T
  : {
      readonly [K in keyof T]: DeepReadonly<T[K]>;
    };

export interface IPost {
  _id: string;
  name: string;
  prompt: string;
  imageUrl: string;
}

export interface IFormStates {
  name: string;
  prompt: string;
  image: string;
}

// FormFieldNames' values should be the same as the keys(partial) in IFormStates
export enum FormFieldNames {
  Name = 'name',
  Prompt = 'prompt',
  Search = 'search',
}

export interface IDalleImageResponse {
  created: number;
  image: string;
}

export interface ICreateNewPostRequest {
  sucess: boolean;
  data: {
    _id: string;
    name: string;
    prompt: string;
    imageUrl: string;
  };
}

export interface IFetchAllPostsResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    prompt: string;
    imageUrl: string;
  }[];
}
