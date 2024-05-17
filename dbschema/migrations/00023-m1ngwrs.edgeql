CREATE MIGRATION m1ngwrslaavpmreijtzidrxwb5n4pqrbtdlfincnkov2c7fy6yy4pq
    ONTO m1zmhocouq7tgv5rq5zqt62kr7l5erfuocu4i67aast5ma3qnrpzta
{
  ALTER TYPE default::Clone {
      ALTER LINK scanned {
          SET REQUIRED USING (<default::User>{});
      };
      ALTER LINK scanner {
          SET REQUIRED USING (<default::User>{});
      };
      ALTER PROPERTY matchCount {
          SET REQUIRED USING (<std::int64>{});
      };
  };
};
