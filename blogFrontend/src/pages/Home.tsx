import Post from "@/components/Post";
import { useGetPostQuery } from "@/services/postSlice";
import { postType } from "@/lib/types";
import NoLoginUser from "@/components/NoLoginUser";

function Home() {
  const token = localStorage.getItem("token");
  const { data } = useGetPostQuery("post");
  const list = data?.data?.posts?.map((d: postType) => (
    <Post key={d._id} {...d} />
  ));

  if (!token) return <NoLoginUser />;

  return (
    <section className="my-10 flex flex-col gap-4 trans md:px-20 sm:px-2 px-2  ">
      {list?.length === 0 ? <h2>Empty Post</h2> : list}
    </section>
  );
}

export default Home;
