import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ post }: { post: PostI }) {
  const router = useRouter();
  const [state, setState] = useState({ showConfirm: false })

  async function handleDeletePost() {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/profile');
    }
  }

  function handleClick() {
    // const newState = Object.assign({}, state, {
    //   showConfirm: !state.showConfirm
    // })
    // setState(newState);
    setState({...state, showConfirm: !state.showConfirm});
  }

  return (
    <div>
      {!state.showConfirm && (
        <button
          onClick={handleClick}
          className="text-red-400"
        >Delete Post</button>
      )}

      {state.showConfirm && (
        <div>
          <p>Are you sure you want to delete this post?</p>

          <div className="flex flex-row gap-10">
            <button
              onClick={handleDeletePost}
              className="text-red-400 "
            >Yes</button>
            
            <button
              onClick={handleClick}
              className="text-blue-400 "
            >No</button>
          </div>
        </div>
      )}
    </div>
  )
}