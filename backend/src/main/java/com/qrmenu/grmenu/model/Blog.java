// backend/src/main/java/com/qrmenu/grmenu/model/Blog.java
package com.qrmenu.grmenu.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "blogs")
public class Blog {
    @Id
    private String id;
    private String username;
    private String content;
    private String topic; // <-- Add this line

    public Blog() {}

    public Blog(String username, String content, String topic) {
        this.username = username;
        this.content = content;
        this.topic = topic;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
}