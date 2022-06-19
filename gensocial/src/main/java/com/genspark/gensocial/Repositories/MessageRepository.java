package com.genspark.gensocial.Repositories;

import com.genspark.gensocial.Entities.Message;
import com.genspark.gensocial.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
}
