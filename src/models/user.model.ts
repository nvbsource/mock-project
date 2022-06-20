export interface UserLogin {
  email: string;
  password: string;
  remember?: string | null;
}
export interface UserRegister {
  username: string;
  password: string;
  email: string;
}
export interface InformationUser {
  username: string;
  bio: string;
  image: string;
  following?: boolean;
}
export interface UpdateInformationUser {
  username: string;
  bio: string;
  image: string;
  password: string;
}
