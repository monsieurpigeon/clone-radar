CREATE MIGRATION m1g5bfa42fyzxwnpiqncflwtdpil7suajah55e5b7hphvnouvct5ea
    ONTO m1frohfrfmvfqgw4ob27n3pg5jkrzdhlcxrkozvp4hh64hrv32qndq
{
  ALTER TYPE default::Clone {
      CREATE LINK scanned: default::User;
  };
  ALTER TYPE default::Clone {
      CREATE LINK scanner: default::User;
  };
  ALTER TYPE default::Clone {
      CREATE CONSTRAINT std::exclusive ON ((.scanner, .scanned));
  };
  ALTER TYPE default::Clone {
      DROP CONSTRAINT std::exclusive ON (.users);
  };
  ALTER TYPE default::Clone {
      DROP LINK users;
  };
};
