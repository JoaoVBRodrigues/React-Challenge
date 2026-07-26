export interface User {
  name: {
    title?: string;
    first: string;
    last: string;
  };
  email: string;
  cell: string;
  phone?: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state?: string;
    country: string;
    postcode?: string | number;
  };
  login: {
    uuid: string;
    username?: string;
  };
  nat: string;
  gender?: string;
}

export interface RandomUserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
