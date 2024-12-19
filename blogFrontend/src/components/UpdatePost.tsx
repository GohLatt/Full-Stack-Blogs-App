import { profileType } from "@/lib/types";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/services/reduxHook";
import { setPostData } from "@/services/dataSlice";
import { useDeletePostMutation } from "@/services/postSlice";
import toast from "react-hot-toast";

function UpdatePost({ title, content, _id }: profileType) {
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const dispatch = useAppDispatch();
  const handleUpdate = (data: any) => {
    dispatch(setPostData(data));
  };
  const handleDelete = async (id: string) => {
    const result = await deletePost({ id: id });
    toast.success(result.data.message);
  };
  return (
    <li className="w-[100%] rounded-lg px-4 pt-4 pb-12 shadow-md relative hover:shadow-2xl ">
      <h6 className="mt-4 mb-2 font-bold">{title}</h6>
      <p className=" leading-6 ">{content}</p>
      <div className="absolute right-2 bottom-2 ">
        <Button
          onClick={() => handleUpdate({ title, content, id: _id })}
          className="mr-4"
        >
          <a href="#edit"> Update</a>
        </Button>
        <Button onClick={() => handleDelete(_id)} variant={"destructive"}>
          {isLoading ? "Loading" : "Delete"}
        </Button>
      </div>
    </li>
  );
}

export default UpdatePost;
