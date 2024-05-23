CREATE MIGRATION m123h4dgzy4skpzttu6c2mihjwg55slzkndkpppqjb5ljcbf4jq62q
    ONTO m12tvo6272sh35ogob6hkvwtcrfyqis6xmbt6pu77diibr2ngwuppa
{
  ALTER TYPE default::Conversation {
      CREATE LINK origin := (.<conversation[IS default::Clone]);
  };
  ALTER TYPE default::Conversation {
      DROP LINK participants;
  };
};
