CREATE MIGRATION m1gq7omzivxbp6ntls47ge7qslco2up773kba7w43dq2dipxnjbpgq
    ONTO m13jjnusx47kvvavqtd3t6mmny4gjiqh2bm6xrotqqwa74gadkwfhq
{
  ALTER TYPE default::Channel {
      CREATE REQUIRED PROPERTY description: std::str {
          SET REQUIRED USING (<std::str>{''});
      };
  };
  ALTER TYPE default::CollectionItem {
      ALTER PROPERTY name {
          DROP CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Channel {
      ALTER PROPERTY name {
          RESET readonly;
          SET OWNED;
          RESET CARDINALITY;
          SET REQUIRED;
          SET TYPE std::str;
      };
      CREATE PROPERTY subscriberCount: std::int64;
      CREATE PROPERTY thumbnailUrl: std::str;
      CREATE PROPERTY videoCount: std::int64;
      CREATE REQUIRED PROPERTY youtubeId: std::str {
          SET REQUIRED USING (<std::str>{''});
      };
  };
  ALTER TYPE default::Channel {
      ALTER PROPERTY name {
          DROP OWNED;
      };
  };
  ALTER TYPE default::CollectionItem {
      DROP PROPERTY name;
  };
  ALTER TYPE default::Channel {
      CREATE REQUIRED PROPERTY name: std::str {
          SET REQUIRED USING (<std::str>{''});
      };
  };
};
