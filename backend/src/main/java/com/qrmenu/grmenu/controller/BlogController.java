package com.qrmenu.grmenu.controller;

import com.qrmenu.grmenu.model.Blog;
import com.qrmenu.grmenu.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @PostMapping
    public Blog addBlog(@RequestBody Blog blog) {
        return blogRepository.save(blog);
    }
}