import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/api";
import { store } from "@/features/tokenSlice";
import { AUTH_SESSION_KEY } from "@/utils/constants";
import { loginRules } from "@/utils/validation";
import { errorToast, successToast } from "@/utils/toastMessage";
import { checkButtonDisable, checkValidation } from "@/utils/helpers";
import { Button, Checkbox, Input, LinkRef, PasswordInput } from "@/components/common";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialFormData = {
    email: "",
    password: "",
  };

  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState({});

  const onChangeValue = (e) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [e.target.name]: e.target.value.replace(/^\s+/, ""),
      };
      checkButtonDisable(updatedData, setIsLoginDisabled);
      checkValidation(
        {
          [e.target.name]: [e.target.value.replace(/^\s+/, "")],
        },
        loginRules,
        error,
        setError,
      );
      return updatedData;
    });
  };

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem(AUTH_SESSION_KEY))
    console.log(data)
    if(data){
      setFormData({
        email:data?.email,
        password:data?.password
      })
      setIsLoginDisabled(false);
    }
  },[])

  const formSubmit = async (e) => {
    e.preventDefault();

    const errorData = await checkValidation(
      formData,
      loginRules,
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
      const user = await api.get(`/users?email=${formData.email}`, {});
      if (user?.data?.length > 0) {
        if (user.data[0].password == formData.password) {
          console.log("You are logged in");
          successToast("you are logged in");
          const authSession = {
            token: user.data[0].email,
            email:  user.data[0].email,
            password: formData.password,
            time: new Date().toISOString(),
            rememberMe,
          };

          if (rememberMe) {
            localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authSession));
          }

          dispatch(store(authSession));
          navigate("/dashboard");
          setError({});
        } else {
          errorToast("Incorrect password. Please try again.");
        }
      } else {
        errorToast("User does not exists");
      }
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
            Hi, Welcome
          </h1>
          <p className="text-light-gray auth-subtext">
            Please login to your account
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Input
            label="email"
            placeholder="example@email.com"
            className="auth-input-width"
            startIcon="mail-icon"
            name="email"
            value={formData.email}
            error={error?.email}
            required
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
        <div className="flex justify-between items-center">
          <Checkbox
            name="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            wrapClassName="cursor-pointer"
            labelClassName="text-light-gray cursor-pointer"
            checkLabel="Remember me"
          />
          <LinkRef
            className="text-light-gray decoration-light-gray"
            href="forgot-password"
            text="Forgot Password?"
          />
        </div>
        {error?.api ? (
          <p className="text-sm text-red-600">{error.api}</p>
        ) : null}
        <div>
          <Button
            text="Login"
            className="w-full"
            disabled={isLoginDisabled}
            loading={isSubmitting}
            type="submit"
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="h-[1px] w-full bg-border-gray"></div>
          <div className="text-sm text-light-gray tracking-[-0.2px] min-w-[80px]">
            Or login with
          </div>
          <div className="h-[1px] w-full bg-border-gray"></div>
        </div>
        <div className="flex gap-4">
          <Button
            startIcon="google"
            text="Sign in with google"
            color="black"
            className="w-full !font-medium"
          />
          <Button
            className="w-full !font-medium"
            startIcon="apple"
            text="Sign in with apple"
            color="black"
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="text-light-gray">Don’t have an account?</div>
          <LinkRef
            href="/register"
            text="Register"
            className="text-primary font-medium"
          />
        </div>
      </div>
    </form>
  );
};

export default Login;
