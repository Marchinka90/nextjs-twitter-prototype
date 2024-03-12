'use client';
import useSWR from "swr";

const fetcher = async (url: RequestInfo | URL) => {
  const res = await fetch(url);

  if (!res.ok) {
    const msg = 'An error occcured while fetching data';
    const info = await res.json();
    const status = res.status;
    const error = new Error(msg);
    console.error(info, status);
    throw error;
  }

  return res.json();
}

export default function Header() {
  const  { data, error, isLoading } = useSWR('/api/users/profile', fetcher);

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

  console.log(data);

  return (
    <header>
      Header
    </header>
  )
}