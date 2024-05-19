CREATE MIGRATION m156oy575mbgneif7n265mzj547ofuusmnht2nkeibawanfjpmaieq
    ONTO m1vakb4c4kxgfmrmrghxcacx5jswwlnquyzclrtgzd5yiaq4ha36wa
{
  ALTER TYPE default::Clone {
      DROP CONSTRAINT std::exclusive ON (.cloneId);
  };
};
