CREATE MIGRATION m14erkvtvrxgouwbesyeocrtytojwbrub3mxd2tmdrwi6eruwemhqa
    ONTO m1yn5cuzuak7obcniax5rszptojw2szhrgn3homdvoen6jpufbprfq
{
  ALTER TYPE default::User {
      ALTER LINK matches {
          RENAME TO clones;
      };
  };
};
