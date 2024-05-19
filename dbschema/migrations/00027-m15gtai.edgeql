CREATE MIGRATION m15gtaikow4fhaxoidnra3jzxmxglissig5i4z5uaqgzwggrcd7fdq
    ONTO m1aqj6ljun2vml6wip3m654jiuaotb3icooyx4jp6vgka6npga24ra
{
  ALTER TYPE default::Clone {
      DROP CONSTRAINT std::exclusive ON ((.scanner, .scanned));
      ALTER LINK restrictedItems {
          USING (SELECT
              (.users.channels INTERSECT (GLOBAL default::current_user).channels)
          ORDER BY
              .subscriberCount ASC
          );
      };
      DROP LINK scanned;
      DROP LINK scanner;
      ALTER PROPERTY cloneId {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
