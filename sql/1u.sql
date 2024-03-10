CREATE extension IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS public.users (
  id bigserial primary key,
  username citext unique not null,
  password text,
  avatar text,
  is_admin boolean default false,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

CREATE TABLE IF NOT EXISTS public.posts (
  id bigserial primary key,
  user_id bigint references public.users (id),
  content text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

CREATE TABLE IF NOT EXISTS public.follows (
  user_id bigint not null references public.users (id),
  follower_id bigint not null references public.users (id),
  created_at timestamp default now(),
  updated_at timestamp default now(),
  unique(user_id, follower_id)
);

CREATE INDEX post_user_id_index on public.posts (user_id);
CREATE INDEX follows_user_id_index on public.follows (user_id);
CREATE INDEX follows_follower_id_index on public.follows (follower_id);