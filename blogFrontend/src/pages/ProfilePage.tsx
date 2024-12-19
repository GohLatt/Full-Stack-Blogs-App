import UpdatePost from "@/components/UpdatePost";
import { useGetProfileQuery } from "@/services/postSlice";
import { profileType } from "@/lib/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { postCreateType } from "@/lib/types";
import { useAppSelector } from "@/services/reduxHook";

import { useUpdatePostMutation } from "@/services/postSlice";
import toast from "react-hot-toast";

function ProfilePage() {
  const { data } = useGetProfileQuery("post_by_user");
  const { register, handleSubmit, reset } = useForm<postCreateType>();

  console.log("profieldata", data);

  const postData = useAppSelector((state) => state.data.postData);

  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const handleUpdate: SubmitHandler<postCreateType> = async (data) => {
    try {
      let result;
      if (data.title && data.content) {
        result = await updatePost({ ...data, id: postData.id });
      } else if (data.title) {
        result = await updatePost({
          title: data.title,
          content: postData.content,
          id: postData.id,
        });
      } else {
        result = await updatePost({
          title: postData.title,
          content: data.content,
          id: postData.id,
        });
      }

      toast.success(result.data.message);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  const list = data?.posts?.map((d: profileType) => (
    <UpdatePost key={d._id} {...d} />
  ));
  return (
    <section className="px-2 lg:px-20 md:px-20 ">
      <div className="px-4 py-4 shadow-md my-4 rounded">
        <p className="font-bold text-lg px-2 lg:px-20 md:px-20">Your Wall</p>
      </div>

      <form
        id="edit"
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col gap-4 w-[100%] bg-blue-500 px-6 py-10 rounded-md "
      >
        <div>
          <label className="block text-gray-100 font-semibold text-lg">
            Title
          </label>
          <input
            placeholder={postData?.title}
            type="text"
            id="title"
            className="input w-[100%] "
            {...register("title")}
          />
        </div>
        <div>
          <label className="block text-gray-100 font-semibold text-lg">
            Content
          </label>
          <textarea
            id="content"
            placeholder={postData?.content}
            className="input w-[100%] h-28"
            {...register("content")}
          />
        </div>
        <Button type="submit" className="w-[100%] h-12 text-lg mt-4">
          {isLoading ? "Loading" : "Update Post"}
        </Button>
      </form>

      <ul className=" flex flex-col gap-4  trans">{list}</ul>
    </section>
  );
}

export default ProfilePage;
