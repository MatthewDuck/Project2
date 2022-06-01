package com.qa.project2.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.project2.domain.CharacterSheet;
import com.qa.project2.services.CharacterSheetService;

@RestController
@CrossOrigin
@RequestMapping("/charactersheet")
public class CharacterSheetController {

	private CharacterSheetService service;

	public CharacterSheetController(CharacterSheetService service) {
		super();
		this.service = service;
	}

	@PostMapping("/create")
	public ResponseEntity<CharacterSheet> create(@RequestBody CharacterSheet created) {
		return new ResponseEntity<CharacterSheet>(service.create(created), HttpStatus.CREATED);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<CharacterSheet> updateCharacterSheet(@PathVariable Long id,
			@RequestBody CharacterSheet updated) {
		return new ResponseEntity<CharacterSheet>(service.update(id, updated), HttpStatus.OK);
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<CharacterSheet> getCharacterSheet(@PathVariable Long id) {
		return new ResponseEntity<CharacterSheet>(service.getCharacterSheet(id), HttpStatus.OK);

	}

	@GetMapping("/getAll")
	public ResponseEntity<List<CharacterSheet>> getAll() {
		return new ResponseEntity<List<CharacterSheet>>(service.getAll(), HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Boolean> deleteCharacterSheet(@PathVariable Long id) {
		return new ResponseEntity<Boolean>(service.deleteCharacterSheet(id), HttpStatus.NO_CONTENT);
	}

}
