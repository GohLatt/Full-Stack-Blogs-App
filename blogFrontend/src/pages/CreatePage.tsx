import { Button } from "@/components/ui/button";
import { postCreateType } from "@/lib/types";
import { useCreatePostMutation } from "@/services/postSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function CreatePage() {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<postCreateType>();

  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleLogin: SubmitHandler<postCreateType> = async (data) => {
    try {
      const result = await createPost(data);
      toast.success(result.data.message);
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
            Title
          </label>
          <input
            type="text"
            id="title"
            className="input w-[100%] "
            {...register("title", {
              required: `Title is required`,
            })}
          />
          {errors.title && (
            <span className="text-red-800 font-semibold">
              {errors.title.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-gray-100 font-semibold text-lg">
            Content
          </label>
          <textarea
            id="content"
            className="input w-[100%] h-28"
            {...register("content", {
              required: `Content is required`,
            })}
          />
          {errors.content && (
            <span className="text-red-800 font-semibold">
              {errors.content.message}
            </span>
          )}
        </div>
        <Button type="submit" className="w-[100%] h-12 text-lg mt-4">
          {isLoading ? "Loading" : "Create"}
        </Button>
      </form>
    </section>
  );
}

export default CreatePage;
