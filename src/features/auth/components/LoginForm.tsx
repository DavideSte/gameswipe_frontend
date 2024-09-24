import { useState } from "react";
import { useLoginMutation } from "../store/api/gamesApi";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { LoginArgs } from "../types";
import { isErrorWithMessage } from "../utils/helpers";
import Alert from "@/core/components/Alert";
import InputWrapper from "./InputWrapper";
import styles from "./SignUpCard.module.css";
import { Button } from "@/core/components/Button";

const defaultValues: LoginArgs = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginArgs>({ defaultValues });

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    try {
      await login(data).unwrap();
    } catch (error) {
      if (isErrorWithMessage(error)) {
        setError(error.data.message);
      } else {
        setError("An unexpected error occurred, please try again.");
      }
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <Alert.Title>Authentication failed</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert>
        )}

        {/* Email Input */}
        <InputWrapper label="Email" name="email" error={errors.email}>
          <input
            className={styles.input}
            {...register("email", {
              required: "* email is required.",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "* Invalid email format",
              },
            })}
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

        {/* Submit Button */}
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          Login
        </Button>
      </form>

      {/* Sign up */}
      <div className="mt-4 sm:mt-2 flex w-full justify-center">
        <p className="flex whitespace-nowrap gap-2 text-sm">
          Don't have an account?
          <NavLink to="/auth/register" className={styles.link}>
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
