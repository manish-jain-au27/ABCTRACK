import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { Icon } from "@iconify/react";
import { Checkbox } from "../ui/checkbox";
import { useMediaQuery } from "../hooks/use-media-query"; // You may need to implement or replace this custom hook.
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const navigate = useNavigate();

  const togglePasswordType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "dashtail@codeshaper.net",
      password: "password",
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data) => {
    startTransition(async () => {
      // Replace this with actual authentication logic, such as calling your backend API
      navigate("/dashboard");
    });
  };

  // Fake sign-in function (replace with your actual authentication API)
  // const fakeSignIn = async (email, password) => {
  //   if (email === "test@example.com" && password === "password") {
  //     return { ok: true };
  //   } else {
  //     return { error: "Invalid credentials" };
  //   }
  // };

  return (
    <div className="w-full py-10">
      <a href="/dashboard" className="inline-block">
        <div className="2xl:w-14 2xl:h-14 text-2xl text-primary font-bold">ABC TRACK</div>
      </a>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Hey, Hello 👋
      </div>
      <div className="2xl:text-lg text-base text-default-600 2xl:mt-2 leading-6">
        Enter the information you entered while registering.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7">
        <div>
          <Label htmlFor="email" className="mb-2 font-medium text-default-600">
            Email
          </Label>
          <Input
            disabled={isPending}
            {...register("email")}
            type="email"
            id="email"
            className={`peer ${errors.email ? "border-destructive" : ""}`}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
        </div>
        {errors.email && (
          <div className="text-destructive mt-2">{errors.email.message}</div>
        )}

        <div className="mt-3.5">
          <Label htmlFor="password" className="mb-2 font-medium text-default-600">
            Password
          </Label>
          <div className="relative">
            <Input
              disabled={isPending}
              {...register("password")}
              type={passwordType}
              id="password"
              className="peer pr-12"
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=" "
            />

            <div
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === "password" ? (
                <Icon icon="heroicons:eye" className="w-5 h-5 text-default-400" />
              ) : (
                <Icon icon="heroicons:eye-slash" className="w-5 h-5 text-default-400" />
              )}
            </div>
          </div>
        </div>
        {errors.password && (
          <div className="text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <div className="mt-5 mb-8 flex flex-wrap gap-2">
          <div className="flex-1 flex items-center gap-1.5">
            <Checkbox
              size="sm"
              className="border-default-300 mt-[1px]"
              id="isRemebered"
            />
            <Label
              htmlFor="isRemebered"
              className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
            >
              Remember me
            </Label>
          </div>
          <a href="/auth/forgot" className="flex-none text-sm text-primary">
            Forget Password?
          </a>
        </div>
        <Button
          className="w-full"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Don't have an account?{" "}
        <a href="/auth/register" className="text-primary">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default LogInForm;