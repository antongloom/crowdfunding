create Table crowdfunding (
  id SERIAL PRIMARY KEY,
  currentId INTEGER,
  owner VARCHAR(42) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target NUMERIC(20, 2) NOT NULL,
  deadline INTEGER,
  amount_collected TEXT,
  image TEXT,
  donators JSONB[],
  donations NUMERIC(20, 2)[]
);