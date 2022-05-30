package com.qa.project2.services;

import com.qa.project2.repository.CharacterSheetRepo;

import java.util.List;

import org.springframework.stereotype.Service;
import com.qa.project2.domain.CharacterSheet;

@Service
public class CharacterSheetService {

	private CharacterSheetRepo repo;

	public CharacterSheetService(CharacterSheetRepo repo) {
		super();
		this.repo = repo;
	}

	public CharacterSheet create(CharacterSheet created) {
		return repo.save(created);

	}

	public CharacterSheet update(Long id, CharacterSheet updated) {

		CharacterSheet existing = repo.findById(id).get();

		existing.setForename(updated.getForename());
		existing.setSurname(updated.getSurname());
		existing.setLevel(updated.getLevel());
		existing.setCharClass(updated.getCharClass());
		existing.setRace(updated.getRace());
		existing.setAlignment(updated.getAlignment());
		existing.setBackround(updated.getBackround());
		existing.setGender(updated.getGender());

		return repo.save(existing);
	}

	public CharacterSheet getCharacterSheet(Long id) {
		return repo.findById(id).get();
	}

	public List<CharacterSheet> getAll() {
		return repo.findAll();
	}

	public boolean deleteCharacterSheet(Long id) {
		repo.deleteById(id);
		return repo.existsById(id);
	}

}
