package com.qa.project2.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.project2.domain.CharacterSheet;
import com.qa.project2.services.CharacterSheetService;

@RestController
@RequestMapping("/character_sheet")
public class CharacterSheetController {
	
	private CharacterSheetService service;
	
	public CharacterSheetController(CharacterSheetService service) {
		super();
		this.service=service;
	}
	
	@PostMapping("/create")
	public ResponseEntity<CharacterSheet> create(@RequestBody CharacterSheet created) {
		return new ResponseEntity<CharacterSheet>(service.create(created), HttpStatus.CREATED);			
	}

}
