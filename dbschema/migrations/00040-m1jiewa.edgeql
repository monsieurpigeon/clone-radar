CREATE MIGRATION m1jiewahcwp5jqrf6e73e3spczci22555iobmvqtp7helnkh6vmmpa
    ONTO m1qbxuk3dcaw2talnq7l3gfyuebvvmvlrdnjpfjhvabo55yv4qusiq
{
  ALTER TYPE default::Conversation {
      CREATE PROPERTY lastWritten: std::datetime;
  };
};
