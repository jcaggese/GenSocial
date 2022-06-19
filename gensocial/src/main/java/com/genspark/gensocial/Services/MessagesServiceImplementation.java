package com.genspark.gensocial.Services;

import com.genspark.gensocial.Entities.Message;
import com.genspark.gensocial.Entities.Post;
import com.genspark.gensocial.Entities.User;
import com.genspark.gensocial.Repositories.MessageRepository;
import com.genspark.gensocial.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessagesServiceImplementation implements MessagesService {
    @Autowired
    private MessageRepository mRepos;
    @Autowired
    private UserService uServ;

    @Override
    public List<Message> getMessages() {
        return mRepos.findAll();
    }

    @Override
    public Message getMessage(int messageId) {
        return null;
    }

    @Override
    public Message sendMessage(String username, String target, String text) {
        System.out.println(target);
        System.out.println(text);
        User user = uServ.getUserByUsername(username);
        User targetUser = uServ.getUserByUsername(target);
        LocalDateTime currTime = LocalDateTime.now();
        Message message = new Message();
        message.setUser(user);
        message.setMessageText(text);
        message.setTarget(targetUser);
        message.setTime(currTime);
        return mRepos.save(message);
    }

    @Override
    public String deleteMessage(int messageId) {
        mRepos.deleteById(messageId);
        return "Post deleted";
    }
}
