package com.genspark.gensocial.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND, reason = "User does not exist")
public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String t){
        super(t);
    }
}
