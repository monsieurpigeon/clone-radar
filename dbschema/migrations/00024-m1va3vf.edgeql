CREATE MIGRATION m1va3vfdgipeaqmyiipvw2rlpwpudfe5ujdemqajwosroopaqbfkla
    ONTO m1ngwrslaavpmreijtzidrxwb5n4pqrbtdlfincnkov2c7fy6yy4pq
{
  ALTER TYPE default::User {
      DROP LINK clones;
  };
};
