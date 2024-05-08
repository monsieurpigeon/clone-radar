using extension auth;

module default {
  scalar type Role extending enum<admin, user>;

  global current_user := (
    assert_single((
      select User
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );

  type Clone {
    cloneCount: int64;
    element: User;
  }

  type User {
    required identity: ext::auth::Identity;
    required name: str;
    email: str;
  
    userRole: Role {
      default := "user";
    };

    multi channels: Channel;
    multi boardGames: BoardGame;
    multi authors: Author;
    multi clones: Clone;

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
    required name: str {
      delegated constraint exclusive;
    }

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
    
  }

  type BoardGame extending CollectionItem {

  }

  type Author extending CollectionItem {
    
  }
}