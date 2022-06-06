package com.qa.project2.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.project2.domain.CharacterSheet;
import com.qa.project2.services.CharacterSheetService;

@WebMvcTest
public class CharacterSheetUnitTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper mapper;

	@MockBean
	private CharacterSheetService service;

	@Test
	public void createTest() throws Exception {
		CharacterSheet input = new CharacterSheet("Sam", "Samson", 2, "Wizard", "Gnome", "Lawfull Good", "Urchin",
				"Male", "https://www.freepngimg.com/thumb/machine/47280-8-rubber-duck-hq-image-free-png.png");
		String inputJSON = mapper.writeValueAsString(input);

		Mockito.when(service.create(input)).thenReturn(input);

		mvc.perform(post("/charactersheet/create").contentType(MediaType.APPLICATION_JSON).content(inputJSON))
				.andExpect(status().isCreated()).andExpect(content().json(inputJSON));
	}

	@Test
	public void updateTest() throws Exception {
		CharacterSheet updated = new CharacterSheet("Bob", "Smith", 2, "Monk", "Human", "Lawfull Good", "Urchin",
				"Male", "https://www.freepngimg.com/thumb/machine/47280-8-rubber-duck-hq-image-free-png.png");
		String updateJSON = mapper.writeValueAsString(updated);
		
		Mockito.when(service.update(1L, updated)).thenReturn(updated);

		mvc.perform(put("/charactersheet/update/1").contentType(MediaType.APPLICATION_JSON).content(updateJSON))
				.andExpect(status().isOk()).andExpect(content().json(updateJSON));
	}

	@Test
	public void getIdTest() throws Exception {
		CharacterSheet input = new CharacterSheet("Bob", "Bobson", 1, "Monk", "Human", "Lawfull Good", "Urchin",
				"Male", "https://www.freepngimg.com/thumb/machine/47280-8-rubber-duck-hq-image-free-png.png");

		String inputJSON = mapper.writeValueAsString(input);
		
		Mockito.when(service.getCharacterSheet(1L)).thenReturn(input);

		mvc.perform(get("/charactersheet/get/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().json(inputJSON));

	}

	@Test
	public void getAllTest() throws Exception {
		CharacterSheet test = new CharacterSheet("Bob", "Bobson", 1, "Monk", "Human", "Lawfull Good", "Urchin",
				"Male", "https://www.freepngimg.com/thumb/machine/47280-8-rubber-duck-hq-image-free-png.png");
		List<CharacterSheet> output = new ArrayList<>();
		output.add(test);

		String outputJSON = mapper.writeValueAsString(output);
		
		Mockito.when(service.getAll()).thenReturn(output);

		mvc.perform(get("/charactersheet/getAll").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().json(outputJSON));

	}

	@Test
	public void deleteTest() throws Exception {
		Mockito.when(service.deleteCharacterSheet(1L)).thenReturn(true);
		
		mvc.perform(delete("/charactersheet/delete/1").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isNoContent());

	}

}
