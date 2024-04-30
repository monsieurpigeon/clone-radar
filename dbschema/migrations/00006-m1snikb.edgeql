CREATE MIGRATION m1snikbqmfw3leom76qz3stnhmjqowhfglnpnwqn4av2k3xu4g3hya
    ONTO m1mswbbmvlock6ugeqhycpjqgwn2q6hijf4qryq2r76kgasd6gj2ja
{
  ALTER TYPE default::Channel {
      DROP ACCESS POLICY creator_has_full_access;
      DROP LINK created_by;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK channels: default::Channel;
  };
};
