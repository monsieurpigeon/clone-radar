CREATE MIGRATION m1vakb4c4kxgfmrmrghxcacx5jswwlnquyzclrtgzd5yiaq4ha36wa
    ONTO m15gtaikow4fhaxoidnra3jzxmxglissig5i4z5uaqgzwggrcd7fdq
{
  ALTER TYPE default::Clone {
      CREATE LINK other := (SELECT
          .users
      FILTER
          (.id != (GLOBAL default::current_user).id)
      );
  };
};
