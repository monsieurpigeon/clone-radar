CREATE MIGRATION m1aqj6ljun2vml6wip3m654jiuaotb3icooyx4jp6vgka6npga24ra
    ONTO m1o4pkz23sfibo2uzgjbp3dqkgrzqo4ky5xpeuvnpvcildwn6bbesa
{
  ALTER TYPE default::Clone {
      CREATE REQUIRED PROPERTY cloneId: std::str {
          SET REQUIRED USING (<std::str>.id);
      };
      CREATE CONSTRAINT std::exclusive ON (.cloneId);
      CREATE MULTI LINK users: default::User;
  };
};
