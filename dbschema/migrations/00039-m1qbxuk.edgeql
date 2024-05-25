CREATE MIGRATION m1qbxuk3dcaw2talnq7l3gfyuebvvmvlrdnjpfjhvabo55yv4qusiq
    ONTO m1geuuq56zessh3bwdddlznn2sylmbvm5zjbjtpvnz6vrjw3vh6wdq
{
  ALTER TYPE default::Conversation {
      CREATE PROPERTY isUnread := ((.unread = GLOBAL default::current_user));
  };
};
