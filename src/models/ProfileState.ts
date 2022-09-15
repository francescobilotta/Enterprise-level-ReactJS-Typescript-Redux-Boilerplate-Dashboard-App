import { UserType } from "./User";

export type ProfileStateType = {
  readonly profile: UserType;
  readonly loading: boolean;
  readonly error: string;
};

export const profileStateDefaultValue: ProfileStateType = {
  error: "",
  loading: false,
  profile: {} as UserType,
};
