import * as Yup from "yup";

import { CountryType } from "../ui-kit/models";
import { SubscriptionType } from "./Subscription";

export type UserType = {
  id: string;
  email: string;
  password: string;
  country: CountryType;
  isPublic: boolean;
  phone: string;
  role: string;
  state: string;
  tier: string;
  name: string;
  avatar: string;
  city: string;
  canHire: boolean;
  subscription?: SubscriptionType;
};

export const yupUserValidation = Yup.object().shape({
  canHire: Yup.bool(),
  city: Yup.string().max(255),
  country: Yup.string().max(255),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  isPublic: Yup.bool(),
  name: Yup.string().max(255).required("Name is required"),
  phone: Yup.string(),
  state: Yup.string(),
});

export const userDefaultValue: UserType = {
  avatar: "",
  canHire: false,
  city: "",
  country: {} as CountryType,
  email: "demo@acme.io",
  id: "",
  isPublic: false,
  name: "",
  password: "Pass123!",
  phone: "",
  role: "",
  state: "",
  subscription: undefined,
  tier: "",
};
