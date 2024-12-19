import Profile from "@/components/Profile";
import { FaCommentAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CommentModal from "./CommentModal";
import { postType } from "@/lib/types";
import { color } from "@/data";

function Post({
  authorData,
  title,
  content,
  createdAt,
  comments,
  _id,
}: postType) {
  const [open, setOpen] = useState(false);
  const author = authorData.name.slice(0, 1).toLowerCase();
  const authColor = color.find((d) => d.char === author);
  console.log(authColor);

  return (
    <>
      <div
        style={{ backgroundColor: authColor?.color }}
        className={`w-[100%] rounded-lg px-4 py-4  hover:shadow-2xl`}
      >
        <Profile
          authorData={authorData}
          createdAt={createdAt}
          authColor={authColor}
        />
        <h6 className="mt-4 mb-2 font-bold">{title}</h6>
        <p className=" leading-6 ">{content}</p>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center mt-3 "
          variant="ghost"
        >
          <span>
            <FaCommentAlt />
          </span>
          <span> {comments?.length} Comment</span>
        </Button>
      </div>
      <CommentModal
        open={open}
        setOpen={setOpen}
        comment={comments}
        color={authColor?.color}
        postId={_id}
      />
    </>
  );
}

export default Post;
