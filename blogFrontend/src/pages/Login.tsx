import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginType } from "@/lib/types";
import { fetchAuthApi } from "@/api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<loginType>();

  const handleLogin: SubmitHandler<loginType> = async (data) => {
    try {
      const result = await fetchAuthApi("login", data);
      toast.success(result.message);
      result.message === "success" &&
        localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err) {}
    reset();
  };
  return (
    <section className="flex justify-center px-2 my-10">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4 w-[400px] bg-blue-500 px-6 py-10 rounded-md"
      >
        <div>
          <label className="block text-gray-100 font-semibold text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input w-[100%] text"
            {...register("email", {
              required: `Email is required`,
            })}
          />
          {errors.email && (
            <span className="text-red-800 font-semibold">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-gray-100 font-semibold text-lg">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input w-[100%] text"
            {...register("password", {
              required: `Password is required`,
            })}
          />
          {errors.password && (
            <span className="text-red-800 font-semibold">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button type="submit" className="w-[100%] h-12 text-lg mt-4">
          Log In
        </Button>
      </form>
    </section>
  );
}

export default Login;
