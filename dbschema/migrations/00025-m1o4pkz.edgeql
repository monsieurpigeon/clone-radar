CREATE MIGRATION m1o4pkz23sfibo2uzgjbp3dqkgrzqo4ky5xpeuvnpvcildwn6bbesa
    ONTO m1va3vfdgipeaqmyiipvw2rlpwpudfe5ujdemqajwosroopaqbfkla
{
  ALTER TYPE default::User {
      ALTER PROPERTY githubUsername {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
