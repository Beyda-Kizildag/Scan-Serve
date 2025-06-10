package com.qrmenu.grmenu.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String username;
    private String product;
    private String comment;

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getProduct() { return product; }
    public void setProduct(String product) { this.product = product; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}