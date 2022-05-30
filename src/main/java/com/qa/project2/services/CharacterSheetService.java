package com.qa.project2.services;

import com.qa.project2.repository.CharacterSheetRepo;

import org.springframework.stereotype.Service;

import com.qa.project2.domain.CharacterSheet;

@Service
public class CharacterSheetService {
	
	private CharacterSheetRepo repo;
	
	public CharacterSheetService(CharacterSheetRepo repo) {
		super();
		this.repo=repo;
	}
	
	public CharacterSheet create(CharacterSheet created) {
		return repo.save(created);
		
	}

}
