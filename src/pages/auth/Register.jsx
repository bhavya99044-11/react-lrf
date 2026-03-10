import React, { useState } from "react";
import { Button, Input, LinkRef, PasswordInput } from "@/components/common";
import { useNavigate } from "react-router-dom";
import { checkButtonDisable, checkValidation } from "../../utils/helpers";
import { registerRules } from "../../utils/validation";
import { api } from "../../utils/api";

const Register = () => {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    email: "",
    password: "",
  };

  const [isSignupDisabled, setIsSignupDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState({});

  const onChangeValue = (e) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [e.target.name]: e.target.value.replace(/^\s+/, ""),
      };
      checkButtonDisable(updatedData, setIsSignupDisabled);
      checkValidation(
        {
          [e.target.name]: [e.target.value.replace(/^\s+/, "")],
        },
        registerRules,
        error,
        setError,
      );
      return updatedData;
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const errorData = await checkValidation(
      formData,
      registerRules,
      error,
      setError,
    );
    const hasEmptyField = Object.keys(errorData).every((key) => {
      return errorData[key] == "";
    });
    if (!hasEmptyField) {
      return;
    }

    setIsSubmitting(true);
    try {
      const existingUsersResponse = await api.get("/users", {
        params: { email: formData.email },
      });
      if (existingUsersResponse.data.length > 0) {
        setError((prev) => ({
          ...prev,
          email: "Email already exists",
        }));
        return;
      }

      await api.post("/users", formData);
      setFormData(initialFormData);
      setError({});
      setIsSignupDisabled(true);
      navigate("/login");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={formSubmit}
      className="auth-page geist-font"
    >
      <div className="auth-card">
        <div>
          <img src="/images/adjoe-logo.png"></img>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold tracking-[0.2px] text-heading">
            Create your account
          </h1>
          <p className="text-light-gray auth-subtext">
            Please register your account
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Input
            label="Name"
            placeholder="First and Last name"
            className="auth-input-width"
            startIcon="user"
            name="name"
            value={formData.name}
            required={true}
            error={error?.name}
            onChange={onChangeValue}
          />
          <Input
            label="email"
            placeholder="example@email.com"
            className="auth-input-width"
            startIcon="mail-icon"
            name="email"
            value={formData.email}
            error={error?.email}
            required={true}
            onChange={onChangeValue}
          />
          <PasswordInput
            className="auth-input-width"
            label="password"
            placeholder="Input your password"
            name="password"
            value={formData.password}
            required={true}
            error={error?.password}
            onChange={onChangeValue}
          />
        </div>
        {error?.api ? (
          <p className="text-sm text-red-600">{error.api}</p>
        ) : null}
        <div>
          <Button
            text="Signup"
            className="w-full"
            disabled={isSignupDisabled}
            loading={isSubmitting}
            type="submit"
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="text-light-gray">Do you have an account?</div>
          <LinkRef
            href="/login"
            text="login"
            className="text-primary font-medium"
          />
        </div>
      </div>
    </form>
  );
};

export default Register;
