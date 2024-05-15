CREATE MIGRATION m13jjnusx47kvvavqtd3t6mmny4gjiqh2bm6xrotqqwa74gadkwfhq
    ONTO m1f5u7kjnrfomhjbefvrpnslpafihg3of7oczrl5q3z46meggh5o5q
{
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY avatarUrl: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE REQUIRED PROPERTY githubUsername: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
