CREATE MIGRATION m1dyu6kd6xcgd7pcycg53nsmps3slkfuvjlndmwy22xh6jsimaa6la
    ONTO m16aqihl4yaeqbg47okfio2zdlwpvoe6s7ufqw2v4aljos7n2mumua
{
  CREATE ABSTRACT TYPE default::CollectionItem {
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE DELEGATED CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  CREATE TYPE default::BoardGame EXTENDING default::CollectionItem;
  ALTER TYPE default::Channel {
      DROP ACCESS POLICY admin_has_full_access;
  };
  ALTER TYPE default::CollectionItem {
      CREATE ACCESS POLICY admin_has_full_access
          ALLOW ALL USING (((GLOBAL default::current_user).userRole ?= default::Role.admin));
  };
  ALTER TYPE default::Channel {
      DROP ACCESS POLICY others_read_only;
      EXTENDING default::CollectionItem LAST;
  };
  ALTER TYPE default::CollectionItem {
      CREATE ACCESS POLICY others_read_only
          ALLOW SELECT, INSERT ;
  };
  ALTER TYPE default::Channel {
      ALTER PROPERTY created {
          DROP REWRITE
              INSERT ;
              DROP OWNED;
              RESET TYPE;
          };
          ALTER PROPERTY name {
              ALTER CONSTRAINT std::exclusive {
                  DROP OWNED;
              };
              RESET OPTIONALITY;
              DROP OWNED;
              RESET TYPE;
          };
          ALTER PROPERTY updated {
              DROP REWRITE
                  INSERT ;
                  DROP REWRITE
                      UPDATE ;
                      DROP OWNED;
                      RESET TYPE;
                  };
              };
};
