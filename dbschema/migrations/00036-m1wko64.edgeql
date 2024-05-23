CREATE MIGRATION m1wko64shq3clm6lik2n2pg4qejyq7zot73s4xpsohaj34pfmjc55q
    ONTO m1sesx5aktinowq3yfb4g6cp56vs6k2z4at3ga7cxm6as6unt5kddq
{
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY threshold: std::int64 {
          SET REQUIRED USING (<std::int64>3);
      };
  };
};
