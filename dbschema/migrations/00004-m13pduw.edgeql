CREATE MIGRATION m13pduwhep3cjei2qx3aaydp7e5imj2xelz7635mvlbepfdjimvpca
    ONTO m16rd7avmk43popi5id4z6ozkycnubvtou4h7u3al4x5clwuzowvoa
{
  ALTER GLOBAL default::current_user USING (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
