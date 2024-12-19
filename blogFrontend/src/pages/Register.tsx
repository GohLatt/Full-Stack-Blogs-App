import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerType } from "@/lib/types";
import { fetchAuthApi } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registerType>();

  const handleRegister: SubmitHandler<registerType> = async (data) => {
    try {
      const result = await fetchAuthApi("register", data);
      toast.success(result.message);
      navigate("/login");
    } catch (err) {}

    reset();
  };
  return (
    <section className="flex justify-center my-10 px-2">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col gap-4 w-[400px] bg-blue-500 px-6 py-10 rounded-md"
      >
        <div>
          <label className="block text-gray-100 font-semibold text-lg">
            User Name
          </label>
          <input
            type="text"
            id="name"
            className="input w-[100%] text"
            {...register("name", {
              required: `User name is required`,
            })}
          />
          {errors.name && (
            <span className="text-red-800 font-semibold">
              {errors.name.message}
            </span>
          )}
        </div>

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
          Register
        </Button>
      </form>
    </section>
  );
}

export default Register;
