import { NavLink } from "react-router-dom";
import { RegisterArgs } from "../types";
import { useRegisterMutation } from "../store/api/gamesApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { isErrorWithMessage } from "../utils/helpers";
import Alert from "@/core/components/Alert";
import InputWrapper from "./InputWrapper";
import styles from "./SignUpCard.module.css";
import { Button } from "@/core/components/Button";
import PasswordConstraint from "./PasswordConstraint";

const defaultValues: RegisterArgs = {
  email: "",
  password: "",
  username: "",
};

export default function RegisterForm() {
  const [runRegister, { isLoading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterArgs>({ defaultValues });
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);

  const onSubmit = handleSubmit(async (data) => {
    setMessage(null);
    setError(null);
    // check if constraints are met
    if (hasNumber && hasValidChars && hasValidLength) {
      try {
        const { message } = await runRegister(data).unwrap();
        setMessage(message);
      } catch (error) {
        if (isErrorWithMessage(error)) {
          setError(error.data.message);
        } else {
          setError("An unexpected error occurred, please try again.");
        }
      }
    }
  });

  const password = watch("password");
  const { hasNumber, hasValidChars, hasValidLength } = passwordCheck(password);

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        {/* Messages */}
        {message && (
          <Alert variant="success">
            <Alert.Title>Registration successful.</Alert.Title>
            <Alert.Description>{message}</Alert.Description>
          </Alert>
        )}

        {/* Error Messages */}
        {error && (
          <Alert variant="destructive">
            <Alert.Title>Authentication failed</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert>
        )}

        {/* Username Input */}
        <InputWrapper label="Username" name="username" error={errors.username}>
          <input
            className={styles.input}
            {...register("username", { required: "* field is required." })}
            type="text"
          />
        </InputWrapper>

        {/* Email Input */}
        <InputWrapper label="Email" name="email" error={errors.email}>
          <input
            className={styles.input}
            {...register("email", { required: "* field is required." })}
            type="email"
          />
        </InputWrapper>

        {/* Password Input */}
        <InputWrapper label="Password" name="password" error={errors.password}>
          <input
            className={styles.input}
            {...register("password", { required: "* field is required." })}
            type="password"
          />
        </InputWrapper>

        {/* Password Constraints */}
        <div className="flex flex-col gap-2 px-3 pb-2 mt-[-4px]">
          <PasswordConstraint isValid={hasValidLength} text="at least 8 characters." />
          <PasswordConstraint isValid={hasValidChars} text="at least one special character." />
          <PasswordConstraint isValid={hasNumber} text="at least one number." />
        </div>

        {/* Submit Button */}
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          Sign Up
        </Button>
      </form>

      {/* Log In */}
      <div className="mt-4 sm:mt-2 flex w-full justify-center">
        <p className="flex whitespace-nowrap gap-2 text-sm">
          Already have an account?
          <NavLink to="/auth/login" className={styles.link}>
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

// util function to check password strength
function passwordCheck(password: string) {
  const hasNumber = /\d/.test(password);
  const hasValidChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasValidLength = password.length >= 8;
  return { hasNumber, hasValidChars, hasValidLength };
}
