CREATE MIGRATION m1f5u7kjnrfomhjbefvrpnslpafihg3of7oczrl5q3z46meggh5o5q
    ONTO m1hpekdval7qs3mfkmtsieenz7njo2fkjwqjp2ghhf6bzerdgdaapa
{
  ALTER TYPE default::User {
      DROP LINK authors;
      DROP LINK boardGames;
  };
  DROP TYPE default::Author;
  DROP TYPE default::BoardGame;
  ALTER TYPE default::Channel {
      CREATE LINK fans := (.<channels[IS default::User]);
  };
};
