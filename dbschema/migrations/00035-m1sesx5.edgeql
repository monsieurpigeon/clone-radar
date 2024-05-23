CREATE MIGRATION m1sesx5aktinowq3yfb4g6cp56vs6k2z4at3ga7cxm6as6unt5kddq
    ONTO m1gsze4jerdcdfcewrxnrgebimr2d27casvhzl7a7nxcvnwkfb6lya
{
  ALTER TYPE default::Clone {
      ALTER LINK other {
          USING (SELECT
              std::assert_single((SELECT
                  .users
              FILTER
                  (.id != (GLOBAL default::current_user).id)
              ))
          );
      };
  };
};
