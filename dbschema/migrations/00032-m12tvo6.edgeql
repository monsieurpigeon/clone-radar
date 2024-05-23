CREATE MIGRATION m12tvo6272sh35ogob6hkvwtcrfyqis6xmbt6pu77diibr2ngwuppa
    ONTO m12i3aqciwpgmqp3he3bx62pdo7sris6qd2nvjfcyjhl252utcw3vq
{
  ALTER TYPE default::Clone {
      CREATE LINK conversation: default::Conversation {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
  ALTER TYPE default::Conversation {
      ALTER LINK messages {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
