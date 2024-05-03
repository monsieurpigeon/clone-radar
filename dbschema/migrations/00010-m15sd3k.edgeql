CREATE MIGRATION m15sd3k7epslv4bxoufskwsqzjsegzp24ucahikaagq2ow3mwrad4q
    ONTO m1dyu6kd6xcgd7pcycg53nsmps3slkfuvjlndmwy22xh6jsimaa6la
{
  ALTER TYPE default::User {
      CREATE MULTI LINK boardGames: default::BoardGame;
  };
};
