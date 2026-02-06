-- Create a table for storing infographic designs
create table public.designs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.designs enable row level security;

-- Create policies to ensure users can only access their own designs

-- Policy for SELECT
create policy "Users can view their own designs"
  on public.designs for select
  using (auth.uid() = user_id);

-- Policy for INSERT
create policy "Users can insert their own designs"
  on public.designs for insert
  with check (auth.uid() = user_id);

-- Policy for UPDATE
create policy "Users can update their own designs"
  on public.designs for update
  using (auth.uid() = user_id);

-- Policy for DELETE
create policy "Users can delete their own designs"
  on public.designs for delete
  using (auth.uid() = user_id);
