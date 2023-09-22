import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContextProvider } from "../../AuthProvider/AuthProvider";

const UpdateProfile = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formValues, setFormValues] = useState({
    photoURL: "",
    name: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const { user, loading } = useContext(AuthContextProvider);
  const onsubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto my-20">
      <div className="flex gap-2 items-center">
        <Link to={"/"}>
          <FaAngleLeft className="text-3xl hover:text-primary"></FaAngleLeft>
        </Link>
        <h1 className="text-2xl font-semibold">Profile update</h1>
      </div>
      {/* -------------Input Form--------------- */}
      {loading ? (
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#F65E01]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <form
            className="mt-10 w-[300px] mx-auto text-center p-6 rounded-md border border-gray-200"
            onSubmit={handleSubmit(onsubmit)}
          >
            {/* Profile Images */}
            <img
              className="w-24 h-24 mx-auto mb-6 rounded-md"
              src={user.photoURL}
              alt=""
            />
            <div className="mb-4">
              {/* <label className="label">Upload Image</label> */}
              <input
                {...register("photoURL")}
                onChange={(e) => {
                  setValue("photoURL", e.target.value);
                  setFormValues({ ...formValues, photoURL: e.target.value });
                  setIsButtonDisabled(
                    Object.values({
                      ...formValues,
                      photoURL: e.target.value,
                    }).every((value) => value === "")
                  );
                }}
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.6rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.6rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.6rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="formFile"
              />
            </div>

            {/* Name input */}
            <div className="relative" data-te-input-wrapper-init>
              <input
                type="text"
                name="name"
                {...register("name")}
                onChange={(e) => {
                  setValue("name", e.target.value);
                  setFormValues({ ...formValues, name: e.target.value });
                  setIsButtonDisabled(
                    Object.values({
                      ...formValues,
                      name: e.target.value,
                    }).every((value) => value === "")
                  );
                }}
                className=" peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
                id="exampleFormControlInput3"
                placeholder="Full Name"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-white mt-6"
              disabled={isButtonDisabled}
            >
              Update Profile
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateProfile;
