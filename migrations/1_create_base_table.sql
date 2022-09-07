CREATE TABLE IF NOT EXISTS users ( 
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT UNIQUE, 
  hashed_password bytea, 
  salt bytea, 
  name TEXT,
  email TEXT UNIQUE, 
  email_verified INTEGER
);

CREATE TABLE IF NOT EXISTS federated_credentials ( 
  id INTEGER PRIMARY KEY, 
  user_id INTEGER NOT NULL, 
  provider TEXT NOT NULL, 
  subject TEXT NOT NULL, 
  UNIQUE (provider, subject) 
);
