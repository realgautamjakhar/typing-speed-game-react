import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);

  const userLogin = async (values) => {
    const { email, password } = values;
    setloading(true);
    const response = await fetch(
      "https://typing-backend-three.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const result = await response.json();
    if (result.success) {
      setloading(false);
      toast(`Loged In`, {
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
      toast.error(`${result.msg}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setloading(false);
    }
  };

  return (
    <>
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
      <div className="h-full w-full bg-[url('assets/blob.svg')] bg-no-repeat md:bg-center bg-bottom flex items-center justify-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            userLogin(values);
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col max-w-sm w-full  gap-6 bg-white py-6 px-4  rounded-2xl mx-2 relative"
            >
              <p className="text-4xl font-bold py-2 flex gap-4 items-center hover:text-AccentPrimary duration-200 ">
                <AiOutlineLogin className=" text-AccentSecondary" />{" "}
                <span>Login</span>
              </p>
              <div className="grid gap-1 w-full relative">
                <label htmlFor="email">Email Address</label>
                <input
                  className={`text-xl outline-none focus:py-2 focus:px-2 focus:bg-AccentPrimary/20  border-b-2 border-AccentPrimary transition-all ease-in-out duration-200 ${
                    formik.touched.email && formik.errors.email
                      ? "bg-AccentSecondary/20"
                      : null
                  }`}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...formik.getFieldProps("email")}
                />
                <p className=" text-AccentSecondary text-sm absolute top-0 right-0">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </p>
              </div>
              <div className="grid gap-1 w-full relative pb-6">
                <label htmlFor="email">Password</label>
                <input
                  className={`text-xl outline-none focus:py-2 focus:px-2 focus:bg-AccentPrimary/20  border-b-2 border-AccentPrimary transition-all ease-in-out duration-200  ${
                    formik.touched.password && formik.errors.password
                      ? "bg-AccentSecondary/20"
                      : null
                  }`}
                  id="password"
                  type="password"
                  placeholder="Your top secret password"
                  {...formik.getFieldProps("password")}
                />
                <p className=" text-AccentSecondary text-sm absolute top-0 right-0">
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
                {!loading ? "SignIn" : "Getting you in!"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
