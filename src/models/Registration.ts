import * as Yup from "yup";

export type RegistrationType = {
  email: string;
  password: string;
  name: string;
  mobile: string;
  policy: boolean;
};

export const yupRegistrationValidation = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  mobile: Yup.string().min(10).required("Required"),
  name: Yup.string().required("Required"),
  password: Yup.string()
    .min(7, "Must be at least 7 characters")
    .max(255)
    .required("Required"),
  policy: Yup.boolean().oneOf([true], "This field must be checked"),
});

export const registrationDefaultValue: RegistrationType = {
  email: "johnnydoe@yahoo.com",
  mobile: "+34782364823",
  name: "John",
  password: "Pass123!",
  policy: false,
};
