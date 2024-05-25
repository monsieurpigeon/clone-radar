CREATE MIGRATION m1geuuq56zessh3bwdddlznn2sylmbvm5zjbjtpvnz6vrjw3vh6wdq
    ONTO m123qur6vgpttss5vcoivkn5qpr22pqhzbkhhcvod6kd6o2mctensa
{
  ALTER TYPE default::Conversation {
      CREATE LINK unread: default::User;
  };
  ALTER TYPE default::User {
      CREATE LINK unreadConversations := (.<unread[IS default::Conversation]);
  };
};
