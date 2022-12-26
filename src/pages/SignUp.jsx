import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const createUser = async (values) => {
    const { firstName, lastName, email, password } = values;
    try {
      setloading(true);
      const response = await fetch(
        "https://typing-backend-three.vercel.app/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        setloading(false);
        toast(`User Created`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("auth-token", result.authToken);
        navigate("/");
      } else {
        setloading(false);
        toast(`${result.msg}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full bg-[url('/assets/blob.svg')] bg-no-repeat md:bg-center bg-bottom flex items-center justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          createUser(values);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col max-w-sm w-full  gap-6 bg-white py-6 px-4 rounded-2xl mx-2 relative"
          >
            <p className="text-4xl font-bold py-2 flex gap-4 items-center hover:text-AccentPrimary duration-200 ">
              <AiOutlineUserAdd className=" text-AccentSecondary" />{" "}
              <span>Create Account</span>
            </p>
            <div className="grid gap-1">
              <label htmlFor="firstName" className=" text-lg ">
                First Name
              </label>
              <input
                className="text-xl outline-none focus:py-2 focus:px-2 focus:bg-AccentPrimary/20  border-b-2 border-AccentPrimary transition-all ease-in-out duration-200"
                id="firstName"
                type="text"
                {...formik.getFieldProps("firstName")}
              />
              <p className=" text-AccentSecondary text-sm relative">
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div>{formik.errors.firstName}</div>
                ) : null}
              </p>
            </div>

            <div className="grid gap-1">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="text-xl outline-none focus:py-2 focus:px-2 focus:bg-AccentPrimary/20  border-b-2 border-AccentPrimary transition-all ease-in-out duration-200"
                id="lastName"
                type="text"
                {...formik.getFieldProps("lastName")}
              />
              <p className=" text-AccentSecondary text-sm relative">
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div>{formik.errors.lastName}</div>
                ) : null}
              </p>
            </div>

            <div className="grid gap-1">
              <label htmlFor="email">Email Address</label>
              <input
                className="text-xl outline-none focus:py-2 focus:px-2 focus:bg-AccentPrimary/20  border-b-2 border-AccentPrimary transition-all ease-in-out duration-200"
                id="email"
                type="email"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
              />
              <p className=" text-AccentSecondary text-sm relative">
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </p>
            </div>
            <div className="grid gap-1 pb-6">
              <label htmlFor="email">Password</label>
              <input
                className="text-xl outline-none focus:py-2 focus:px-2 focus:bg-AccentPrimary/20  border-b-2 border-AccentPrimary transition-all ease-in-out duration-200"
                id="password"
                type="password"
                placeholder="Your top secret password"
                {...formik.getFieldProps("password")}
              />
              <p className=" text-AccentSecondary text-sm relative">
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </p>
            </div>

            <button
              type="submit"
              className={` absolute bottom-[-1.2rem] left-0 right-0 ${
                loading ? "bg-AccentSecondary" : "bg-AccentPrimary"
              } text-white hover:bg-AccentSecondary py-2 rounded-3xl w-fit mx-auto px-6 h-fit duration-400 text-lg transition-all`}
            >
              {!loading ? "Sign Up" : "Getting you in!"}
            </button>
          </form>
        )}
      </Formik>{" "}
    </div>
  );
};

export default SignUp;
