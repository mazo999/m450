package ch.wiss.m223.hangman.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.wiss.m223.hangman.dto.ItemDto;

@RestController
@RequestMapping("/items")
public class DataController {

  List<String> items;

  public DataController() {
    items = new ArrayList<>();
    items.add("private alpha");
    items.add("private beta");
  }

  @GetMapping
  public List<String> getItems() {
    return items;
  }

  @PostMapping
  public ResponseEntity<String> addItem(@RequestBody ItemDto item) {
    items.add(item.getItem());
    return ResponseEntity.ok("saved");
  }
}
