package com.genspark.gensocial.Services;

import com.genspark.gensocial.Entities.Message;
import com.genspark.gensocial.Entities.Post;

import java.util.List;

public interface MessagesService {
    List<Message> getMessages();

    Message getMessage(int messageId);

    Message sendMessage(String username, String message, String text);

    String deleteMessage(int messageId);
}
