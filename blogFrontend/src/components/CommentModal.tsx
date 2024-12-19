import { commentType, postCommentType } from "@/lib/types";
import { useCreateCommentMutation } from "@/services/postSlice";

import { Modal } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  comment?: commentType[];
  color?: string;
  postId: string;
}

function CommentModal({ open, setOpen, comment, color, postId }: Props) {
  const { register, handleSubmit, reset } = useForm<postCommentType>();
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const list = comment?.map((d) => (
    <li
      key={d._id}
      className="flex items-center gap-2 py-2 bg-gray-100 px-4 rounded-lg"
    >
      <div
        className={`w-10 h-10 rounded-full flex justify-center items-center bg-gray-700 border-solid border-2 border-gray-100 `}
      >
        <p className="font-bold text-xl text-gray-50"> {d.name.slice(0, 1)}</p>
      </div>
      <div>
        <p className="font-semibold">{d.name}</p>
        <p>{d.comment}</p>
      </div>
    </li>
  ));

  const handleComment: SubmitHandler<postCommentType> = async (data) => {
    try {
      const finalData = { ...data, postId };
      console.log(finalData);
      const result = await createComment(finalData);
      console.log(result);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        width={700}
        title={<p>Comments</p>}
        loading={isLoading}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <ul className="h-[400px] overflow-y-auto pb-10 list-none flex flex-col gap-3">
          {list}
        </ul>

        <form
          onSubmit={handleSubmit(handleComment)}
          className=" absolute bottom-2 w-full "
        >
          <input
            type="text"
            id="comment"
            placeholder="Enter your comment"
            className="w-[90%] py-5 input bg-blue-200"
            {...register("comment")}
          />
        </form>
      </Modal>
    </>
  );
}

export default CommentModal;
