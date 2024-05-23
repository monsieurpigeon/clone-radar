CREATE MIGRATION m1gsze4jerdcdfcewrxnrgebimr2d27casvhzl7a7nxcvnwkfb6lya
    ONTO m123h4dgzy4skpzttu6c2mihjwg55slzkndkpppqjb5ljcbf4jq62q
{
  ALTER TYPE default::Clone {
      ALTER LINK conversation {
          ON TARGET DELETE ALLOW;
      };
  };
};
