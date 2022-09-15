import { ClaimsType } from "./Claims";

export type AuthStateType = {
  readonly accessToken: string;
  readonly claims: ClaimsType | undefined;
};

export const authStateDefaultValue: AuthStateType = {
  accessToken: "",
  claims: undefined,
};
