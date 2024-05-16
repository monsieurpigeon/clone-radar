CREATE MIGRATION m1gvl2h2qaod6lxh7kojxxvk4ppsbzbaws5udjbdokayjjold5q5za
    ONTO m1gq7omzivxbp6ntls47ge7qslco2up773kba7w43dq2dipxnjbpgq
{
  ALTER TYPE default::Channel {
      ALTER PROPERTY youtubeId {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
