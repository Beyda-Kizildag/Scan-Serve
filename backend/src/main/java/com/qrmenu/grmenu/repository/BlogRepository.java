package com.qrmenu.grmenu.repository;

import com.qrmenu.grmenu.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlogRepository extends MongoRepository<Blog, String> {
}