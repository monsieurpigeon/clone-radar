CREATE MIGRATION m1o7twgewa42hpulxbs35bbzk275imycljuxkx7ufv6pn276ctkesa
    ONTO m1snikbqmfw3leom76qz3stnhmjqowhfglnpnwqn4av2k3xu4g3hya
{
  ALTER TYPE default::Channel {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
