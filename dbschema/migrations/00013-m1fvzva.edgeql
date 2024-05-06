CREATE MIGRATION m1fvzvauxjd7acfdebrur7zgfqyqhmyuskoxke5tttaorxqhqrpmja
    ONTO m14erkvtvrxgouwbesyeocrtytojwbrub3mxd2tmdrwi6eruwemhqa
{
  CREATE TYPE default::Message {
      CREATE REQUIRED LINK author: default::User;
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE REQUIRED PROPERTY text: std::str;
  };
  CREATE TYPE default::Conversation {
      CREATE MULTI LINK messages: default::Message;
      CREATE MULTI LINK participants: default::User;
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
  };
};
