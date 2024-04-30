CREATE MIGRATION m16aqihl4yaeqbg47okfio2zdlwpvoe6s7ufqw2v4aljos7n2mumua
    ONTO m1o7twgewa42hpulxbs35bbzk275imycljuxkx7ufv6pn276ctkesa
{
  ALTER TYPE default::User {
      CREATE MULTI LINK matches: default::User;
  };
};
