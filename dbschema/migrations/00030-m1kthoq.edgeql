CREATE MIGRATION m1kthoqbidnqh7rzjqn3nyo2wtvpw3qvoa4ty6yykevplheykonmdq
    ONTO m156oy575mbgneif7n265mzj547ofuusmnht2nkeibawanfjpmaieq
{
  ALTER TYPE default::Clone {
      ALTER LINK restrictedItems {
          USING (SELECT
              (.other.channels INTERSECT (GLOBAL default::current_user).channels)
          ORDER BY
              .subscriberCount ASC
          );
      };
  };
};
