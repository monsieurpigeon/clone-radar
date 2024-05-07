CREATE MIGRATION m1hpekdval7qs3mfkmtsieenz7njo2fkjwqjp2ghhf6bzerdgdaapa
    ONTO m1fvzvauxjd7acfdebrur7zgfqyqhmyuskoxke5tttaorxqhqrpmja
{
  ALTER TYPE default::Conversation {
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
};
