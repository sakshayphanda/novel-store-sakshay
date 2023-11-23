export interface IAuthor {
  data: IData;
  status: string;
}

export interface IData {
  author: string;
  birthday: string;
  birthPlace: string;
  books: IBook[];
}

export interface IBook {
  imageUrl: string;
  title: string;
  purchaseLink: string;
  PublishDate: string;
}
