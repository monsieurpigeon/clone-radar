CREATE MIGRATION m1frohfrfmvfqgw4ob27n3pg5jkrzdhlcxrkozvp4hh64hrv32qndq
    ONTO m155gzirbbcpfvmdw67x3ke2agqy3cudsusnozudgxhscqtn776fma
{
  CREATE TYPE default::Clone {
      CREATE MULTI LINK users: default::User;
      CREATE CONSTRAINT std::exclusive ON (.users);
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY matchCount: std::int64;
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
};
