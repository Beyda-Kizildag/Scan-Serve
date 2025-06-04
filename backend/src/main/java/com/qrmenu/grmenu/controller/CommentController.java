package com.qrmenu.grmenu.controller;

import com.qrmenu.grmenu.model.Comment;
import com.qrmenu.grmenu.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @GetMapping("/product/{product}")
    public List<Comment> getCommentsByProduct(@PathVariable String product) {
        return commentRepository.findByProduct(product);
    }

    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        return commentRepository.save(comment);
    }
}