export interface UserLogin {
  email: string;
  password: string;
}
export interface UserRegister extends UserLogin {
  username: string;
}
export interface InformationUser extends UserRegister {
  bio: string;
  image: string;
}
