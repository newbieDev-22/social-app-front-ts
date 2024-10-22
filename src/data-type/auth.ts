interface IRegisterInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface ILoginInput {
  email: string;
  password: string;
}

interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
interface IGetDataAuthUser {
  data: {
    user: IUser;
  };
}

export type { IRegisterInput, ILoginInput, IGetDataAuthUser, IUser };
