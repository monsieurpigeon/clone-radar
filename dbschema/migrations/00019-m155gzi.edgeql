CREATE MIGRATION m155gzirbbcpfvmdw67x3ke2agqy3cudsusnozudgxhscqtn776fma
    ONTO m1gvl2h2qaod6lxh7kojxxvk4ppsbzbaws5udjbdokayjjold5q5za
{
  ALTER TYPE default::CollectionItem {
      ALTER ACCESS POLICY others_read_only ALLOW SELECT, UPDATE, INSERT;
  };
};
