CREATE MIGRATION m12i3aqciwpgmqp3he3bx62pdo7sris6qd2nvjfcyjhl252utcw3vq
    ONTO m1kthoqbidnqh7rzjqn3nyo2wtvpw3qvoa4ty6yykevplheykonmdq
{
  ALTER TYPE default::Clone {
      ALTER LINK restrictedItems {
          RESET EXPRESSION;
          RESET EXPRESSION;
          SET MULTI;
          RESET OPTIONALITY;
          SET TYPE default::Channel;
      };
  };
};
