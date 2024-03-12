import Image from "next/image";
import Link from "next/link";

export default function Post({ post }: { post: PostI }) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  const createAt = new Date(post.created_at);
  return (
    <div className="flex flex-row">
      <div>
        {post.avatar && (
          <Link href={`/${post.username}`}>
            <Image
              src={post.avatar}
              width={50}
              height={50}
              alt={post.username}
              className="rounded-full mr-3"
            />
          </Link>
        )}

        {!post.avatar && (
          <div
            style={{ width: 50, height: 50 }}
            className="bg-slate-600 rounded-full mr-3"
          ></div>
        )}
      </div>

      <div className="flex flex-col max-w-xs">
        <div className="font-bold">
          <Link href={`/${post.username}`}>{post.username}</Link>
        </div>
        <div className="text-slate-400">
          {createAt.toLocaleDateString('en-us', options)}
        </div>
        <div>
          {post.content}
        </div>
      </div>
    </div>
  )
}