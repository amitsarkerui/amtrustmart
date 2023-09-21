import React, { useContext, useState } from "react";
import logo from "../../assets/logo/amtrustmart.png";
import signUpImage from "../../assets/Sign up and login/3d-render-secure-login-password-illustration.jpg";
import { useForm } from "react-hook-form";
import { AuthContextProvider } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { logIn } = useContext(AuthContextProvider);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onsubmit = (data) => {
    logIn(data.email, data.password).then((res) => {
      //   console.log("login", res);
      if (res.user) {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        navigate("/");
      }
    });
  };
  // swal alart
  const Toast = Swal.mixin({
    toast: true,
    position: "top-center",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  return (
    <div>
      <div className="container mx-auto">
        <img
          className="max-w-[220px] md:max-w-[300px] mx-auto mt-10"
          src={logo}
          alt=""
        />
        {/* <h2 className="text-center text-2xl font-bold">Create Account</h2> */}
        <section className="border border-gray-200 p-0 md:p-10 my-16 mx-4">
          <div className="container  px-6 py-10">
            <div className="g-6 flex flex-wrap items-center justify-center lg:justify-between">
              {/* Left column container with background */}
              <div className="mb-12 md:mb-0 md:w-10/12 lg:w-6/12">
                <img src={signUpImage} className="w-full" alt="Phone image" />
              </div>

              {/* Right column container with form */}
              <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                <form onSubmit={handleSubmit(onsubmit)}>
                  {/* Email input */}
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="email"
                      name="email"
                      {...register("email", { required: true })}
                      className=" peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
                      id="exampleFormControlInput333"
                      placeholder="Email address"
                    />

                    {errors.email?.type === "required" && (
                      <p>Please enter a valid email</p>
                    )}
                  </div>

                  {/* Password input */}
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="password"
                      name="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 28,
                        pattern: /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])/,
                      })}
                      className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
                      id="exampleFormControlInput33"
                      placeholder="Password"
                    />

                    {(errors.password?.type === "required" && (
                      <p>
                        You can't create a account without password. Please
                        enter a strong password
                      </p>
                    )) ||
                      (errors.password?.type === "minLength" && (
                        <p>Password must be grater than five characters</p>
                      )) ||
                      (errors.password?.type === "maxLength" && (
                        <p>Password must not be grater than 24 characters</p>
                      )) ||
                      (errors.password?.type === "pattern" && (
                        <p>
                          Password must have one Uppercase one lower case and
                          one number.
                        </p>
                      ))}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Sign Up
                  </button>

                  {/* Divider */}
                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                      OR
                    </p>
                  </div>

                  {/* Social login buttons */}
                  <a
                    className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    style={{ backgroundColor: "#4281EF" }}
                    href="#!"
                    role="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Continue with Google
                  </a>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
