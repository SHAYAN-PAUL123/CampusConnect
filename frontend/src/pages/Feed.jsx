  import { useEffect, useState } from "react";
  import Navbar from "../components/Navbar";
  import Postcard from "../components/Postcard";
  import API from "../services/api";
  import { Swiper, SwiperSlide } from "swiper/react";
  import { EffectCards } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/effect-cards";

  const Feed = () => {
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);

    const getPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getPosts();
    }, []);

    const handlePost = async () => {
      if (!content.trim()) return;

      try {
        setPosting(true);
        await API.post("/posts", {
          content,
        });

        setContent("");
        getPosts();
      } catch (err) {
        console.log(err);
      } finally {
        setPosting(false);
      }
    };

    const handleLike = async (id) => {
      try {
        await API.post(`/posts/${id}/like`);
        getPosts();
      } catch (err) {
        console.log(err);
      }
    };

    const handleCommentChange = (id, value) => {
      setComments({
        ...comments,
        [id]: value,
      });
    };

    const handleComment = async (id) => {
      if (!comments[id]?.trim()) return;

      try {
        await API.post(`/posts/${id}/comment`, {
          text: comments[id],
        });

        setComments({
          ...comments,
          [id]: "",
        });

        getPosts();
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-transparent px-4 py-10 text-white">
          <div className="flex flex-col gap-8 items-center justify-around">
            <div className="relative h-30 w-[50%] mb-10 flex flex-col items-center justify-around overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
              <div className="pointer-events-none absolute right-24 top-24 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
              <h1 className="relative mt-3 text-4xl font-bold md:text-5xl">
                CampusConnect
              </h1>
            </div>
            {/* Create Post */}
            <div className="card-hover gap-2 h-auto flex flex-col items-center justify-around w-[75%] mb-10 rounded-[2rem] border border-zinc-800 bg-zinc-950/85 shadow-[0_0_30px_rgba(0,0,0,0.25)]">
              <textarea
                placeholder="What's on your mind?"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-50 rounded-[2rem] text-center border border-zinc-800 bg-black/70 p-4 text-white outline-none transition focus:border-violet-500"
              />

              <div className="mt-5 flex justify-end">
                <button
                  onClick={handlePost}
                  disabled={posting || !content.trim()}
                  className="cursor-pointer h-10 w-20 rounded-xl bg-violet-600 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.6)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {posting ? "Posting..." : "Post"}
                </button>
              </div>
            </div>

            {/* Posts */}
            {loading ? (
              <div className="space-y-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-44 animate-pulse rounded-[2rem] border border-zinc-800 bg-zinc-950/60"
                  />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-zinc-800 bg-zinc-950/50 p-12 text-center text-zinc-500">
                No posts yet — be the first to share something with your
                campus.
              </div>
            ) : (
              <Swiper
  effect="cards"
  grabCursor={true}
  modules={[EffectCards]}
  className="w-full max-w-3xl h-[650px]"
>
  {posts.map((post) => (
    <SwiperSlide key={post._id} className="rounded-[2rem]">
      <Postcard
        post={post}
        commentValue={comments[post._id]}
        onCommentChange={handleCommentChange}
        onCommentSubmit={handleComment}
        onLike={handleLike}
      />
    </SwiperSlide>
  ))}
</Swiper>
            )}
          </div>
          <p className="mt-6 text-center text-sm text-violet-400">
  👈 Swipe left or right 👉
</p>
        </div>
      </>
    );
  };

  export default Feed;