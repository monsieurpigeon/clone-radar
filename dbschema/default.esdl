using extension auth;

module default {
  scalar type Role extending enum<admin, user>;

  global current_user := (
    assert_single((
      select User
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );

  type User {
    required identity: ext::auth::Identity;
    required name: str;
    email: str;
    required githubUsername: str;
    required avatarUrl: str;

  
    userRole: Role {
      default := "user";
    };

    multi channels: Channel;
    multi clones: User;

    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
  }

  type Conversation {
    multi messages: Message;
    multi participants: User;
    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
  }

  type Message {
    required text: str;
    required author: User;
    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
  }

  abstract type CollectionItem {
    created: datetime {
      rewrite insert using (datetime_of_statement());
    }

    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }

    access policy admin_has_full_access
      allow all
      using (global current_user.userRole ?= Role.admin);
    access policy others_read_only
      allow select, insert;
  }

  type Channel extending CollectionItem {
    fans := .<channels[is User];
    required youtubeId: str{
      constraint exclusive;
    };
    required name: str;
    required description: str;
    thumbnailUrl: str;
    subscriberCount: int64;
    videoCount: int64;
  }
}