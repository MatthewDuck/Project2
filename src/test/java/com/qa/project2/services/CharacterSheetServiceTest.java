package com.qa.project2.services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import com.qa.project2.domain.CharacterSheet;
import com.qa.project2.repository.CharacterSheetRepo;

@SpringBootTest
@ActiveProfiles("test")
public class CharacterSheetServiceTest {

	@Autowired
	private CharacterSheetService service;

	@MockBean
	private CharacterSheetRepo repo;

	@Test
	public void createTest() {
		CharacterSheet input = new CharacterSheet("Sam", "Samson", 2, "Wizard", "Gnome", "Lawfull Good", "Urchin",
				"Male");

		CharacterSheet output = new CharacterSheet(1L, "Sam", "Samson", 2, "Wizard", "Gnome", "Lawfull Good", "Urchin",
				"Male");

		Mockito.when(repo.saveAndFlush(input)).thenReturn(output);

		assertEquals(output, service.create(input));

		Mockito.verify(repo, Mockito.times(1)).saveAndFlush(input);
	}

	@Test
	public void updateTest() {
		CharacterSheet input = new CharacterSheet("Bob", "Bobson", 1, "Monk", "Human", "Lawfull Good", "Urchin",
				"Male");

		Optional<CharacterSheet> existing = Optional
				.of(new CharacterSheet(1L, "Bob", "Smith", 2, "Monk", "Human", "Lawfulllll Good", "Urchin", "Male"));
		CharacterSheet output = new CharacterSheet(1L, "Bob", "Bobson", 1, "Monk", "Human", "Lawfull Good", "Urchin", "Male");

		Mockito.when(repo.findById(1L)).thenReturn(existing);
		Mockito.when(repo.saveAndFlush(output)).thenReturn(output);

		assertEquals(output, service.update(1L, input));

		Mockito.verify(repo, Mockito.times(1)).findById(1L);
		Mockito.verify(repo, Mockito.times(1)).saveAndFlush(output);

	}

	@Test
	public void getIdTest() {
		CharacterSheet output = new CharacterSheet(1L, "Bob", "Bobson", 1, "Monk", "Human", "Lawfull Good", "Urchin",
				"Male");
		Optional<CharacterSheet> optionalOutput = Optional.of(output);

		Mockito.when(repo.findById(1L)).thenReturn(optionalOutput);

		assertEquals(output, service.getCharacterSheet(1L));

	}

	@Test
	public void getAllTest() {
		CharacterSheet test = new CharacterSheet(1L, "Bob", "Bobson", 1, "Monk", "Human", "Lawfull Good", "Urchin",
				"Male");
		List<CharacterSheet> output = new ArrayList<>();
		output.add(test);

		Mockito.when(repo.findAll()).thenReturn(output);

		assertEquals(output, service.getAll());

		Mockito.verify(repo, Mockito.times(1)).findAll();
	}

	@Test
	public void deleteTest() {
		Long id = 1L;
		Mockito.when(repo.existsById(id)).thenReturn(false);

		assertEquals(false, service.deleteCharacterSheet(id));

		Mockito.verify(repo, Mockito.times(1)).deleteById(id);
		Mockito.verify(repo, Mockito.times(1)).existsById(id);

	}

}
