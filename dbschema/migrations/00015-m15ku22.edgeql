CREATE MIGRATION m15ku22ifcsmfil6b2bjao6yywhjhfco7nr2cvdj2uopo2vnnzkz6q
    ONTO m1hpekdval7qs3mfkmtsieenz7njo2fkjwqjp2ghhf6bzerdgdaapa
{
  CREATE TYPE default::Clone {
      CREATE LINK element: default::User;
      CREATE PROPERTY cloneCount: std::int64;
  };
  ALTER TYPE default::User {
      ALTER LINK clones {
          SET TYPE default::Clone USING (.clones[IS default::Clone]);
      };
  };
};
