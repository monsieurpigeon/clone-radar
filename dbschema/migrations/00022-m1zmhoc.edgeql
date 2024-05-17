CREATE MIGRATION m1zmhocouq7tgv5rq5zqt62kr7l5erfuocu4i67aast5ma3qnrpzta
    ONTO m1g5bfa42fyzxwnpiqncflwtdpil7suajah55e5b7hphvnouvct5ea
{
  ALTER TYPE default::Clone {
      CREATE LINK restrictedItems := (SELECT
          (.scanned.channels INTERSECT (GLOBAL default::current_user).channels)
      ORDER BY
          .subscriberCount ASC
      );
  };
};
