import { ILoginInput, IUser } from "./auth";

interface IReactChildren {
  children: React.ReactNode;
}

interface IAuthProviderValue {
  login: (credentials: ILoginInput) => Promise<void>;
  logout: () => void;
  authUser: IUser | null;
  isAuthUserLoading: boolean;
}

interface IAvatarProps {
  name: string;
  width?: string;
}

interface IButtonProps {
  children: React.ReactNode;
  bg?: string;
  color?: string;
  width?: string | number;
  onClick?: () => void;
}

interface IInputProps {
  placeholder: string;
  error?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IModalProps {
  children: React.ReactNode;
  title?: string;
  width?: number;
  open?: boolean;
  onClose: () => void;
}

export type {
  IInputProps,
  IReactChildren,
  IAuthProviderValue,
  IAvatarProps,
  IButtonProps,
  IModalProps,
};
