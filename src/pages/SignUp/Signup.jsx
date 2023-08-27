import React, { useContext, useState } from "react";
import logo from "../../assets/logo/amtrustmart.png";
import signUpImage from "../../assets/Sign up and login/3d-render-secure-login-password-illustration.jpg";
import { useForm } from "react-hook-form";
import { AuthContextProvider } from "../../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
const imageHostingToken = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
// console.log(import.meta.env.VITE_IMAGE_HOSTING_TOKEN);

const SignUp = () => {
  const { createUser } = useContext(AuthContextProvider);
  const [passwordMatching, setPasswordMatching] = useState(false);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // swal alart
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const onsubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordMatching(true);
      return;
    }
    // console.log(data);
    const formData = new FormData();
    formData.append("image", data.photoURL[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          //   console.log(imgURL);
          createUser(data.email, data.password)
            .then((result) => {
              const registeredUser = result.user;
              updateProfile(registeredUser, {
                displayName: data.name,
                photoURL: imgURL,
              });
              // console.log(registeredUser);
              const newUser = {
                name: data.name,
                email: data.email,
                photoURL: imgURL,
                role: "user",
              };
              fetch("http://localhost:3030/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(newUser),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.insertedId) {
                    Toast.fire({
                      icon: "success",
                      title: "Signed in successfully",
                    });
                  }
                  if (data.errorMessage) {
                    Toast.fire({
                      icon: "error",
                      title: "This email is already in use",
                    });
                  }
                });
            })
            .catch((err) => {
              Toast.fire({
                icon: "error",
                title: "This email is already in use",
              });
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
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
                {/* Name input */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    name="name"
                    {...register("name", { required: true })}
                    className=" peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
                    id="exampleFormControlInput3"
                    placeholder="Full Name"
                  />

                  {errors.name?.type === "required" && (
                    <p>Name is must be required</p>
                  )}
                </div>
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
                      You can't create a account without password. Please enter
                      a strong password
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
                        Password must have one Uppercase one lower case and one
                        number.
                      </p>
                    ))}
                </div>
                {/* Confirm Password input */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="password"
                    name="confirmPassword"
                    {...register("confirmPassword", {
                      required: true,
                    })}
                    className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
                    id="exampleFormControlInput303"
                    placeholder="Confirm Password"
                  />

                  {passwordMatching ? <p>Password is not matching</p> : <></>}
                </div>

                {/* Profile Images */}
                <div className="mb-4">
                  {/* <label className="label">Upload Image</label> */}
                  <input
                    {...register("photoURL", { required: true })}
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.6rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.6rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.6rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFile"
                  />
                  {errors.photoURL?.type === "required" && (
                    <p className="text-red-600">Photo is required</p>
                  )}
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Create Account
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
  );
};

export default SignUp;
