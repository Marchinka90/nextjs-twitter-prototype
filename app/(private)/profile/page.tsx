"use client";
import useSWR from "swr";
import Form from "./form";
import PostContainer from "@/app/components/post-container";

export default function ProfilePage() {
  const { data, error, isLoading } = useSWR('/api/users/profile/');

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Profile</h1>
      <Form />
      <PostContainer username={data.data.username} showEditBtn={true}/>
    </div>
  )
}