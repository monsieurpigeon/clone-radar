CREATE MIGRATION m1yn5cuzuak7obcniax5rszptojw2szhrgn3homdvoen6jpufbprfq
    ONTO m15sd3k7epslv4bxoufskwsqzjsegzp24ucahikaagq2ow3mwrad4q
{
  CREATE TYPE default::Author EXTENDING default::CollectionItem;
  ALTER TYPE default::User {
      CREATE MULTI LINK authors: default::Author;
  };
};
