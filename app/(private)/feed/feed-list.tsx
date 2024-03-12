import Post from "@/app/components/post";
import useSWR from "swr";

export default function FeedList({ index }: { index: number }) {
  const { data, error, isLoading } = useSWR('/api/posts/feed?page=' + index);

  if (error) {
    return <div>
      Failed to load
    </div>
  }

  if (isLoading) {
    return <div>
      Loading...
    </div>
  }

  return (
    <ul>
      {data.data.map((post: PostI) => {
        return (
          <li className="my-5" key={post.id}>
            <Post post={post}/>
          </li>
        )
      })}
    </ul>
  )
}