CREATE MIGRATION m123qur6vgpttss5vcoivkn5qpr22pqhzbkhhcvod6kd6o2mctensa
    ONTO m1wko64shq3clm6lik2n2pg4qejyq7zot73s4xpsohaj34pfmjc55q
{
  ALTER TYPE default::User {
      CREATE PROPERTY lastScans: array<std::datetime>;
  };
};
