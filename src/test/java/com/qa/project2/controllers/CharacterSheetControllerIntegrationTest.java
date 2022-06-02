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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.project2.domain.CharacterSheet;

@SpringBootTest
@AutoConfigureMockMvc
@Sql(scripts = { "classpath:testschema.sql",
		"classpath:testdata.sql" }, executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
@ActiveProfiles("test")
public class CharacterSheetControllerIntegrationTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper mapper;

	@Test
	public void createTest() throws Exception {
		CharacterSheet input = new CharacterSheet("Sam", "Samson", 2, "Wizard", "Gnome", "Lawfull Good", "Urchin",
				"Male", "https://www.freepngimg.com/thumb/machine/47280-8-rubber-duck-hq-image-free-png.png");
		String inputJSON = mapper.writeValueAsString(input);

		CharacterSheet output = new CharacterSheet(2L, "Sam", "Samson", 2, "Wizard", "Gnome", "Lawfull Good", "Urchin",
				"Male", "https://www.freepngimg.com/thumb/machine/47280-8-rubber-duck-hq-image-free-png.png");
		String outputJSON = mapper.writeValueAsString(output);

		mvc.perform(post("/charactersheet/create").contentType(MediaType.APPLICATION_JSON).content(inputJSON))
				.andExpect(status().isCreated()).andExpect(content().json(outputJSON));
	}

	@Test
	public void updateTest() throws Exception{
		CharacterSheet input = new CharacterSheet("Bob", "Smith", 2, "Monk", "Human", "Lawfull Good", "Urchin","Male", "https://www.freepngimg.com/thumb/machine/47280-8-rubber-duck-hq-image-free-png.png");
		CharacterSheet updated = new CharacterSheet(1L, "Bob", "Smith", 2, "Monk", "Human", "Lawfull Good", "Urchin","Male", "https://www.freepngimg.com/thumb/machine/47280-8-rubber-duck-hq-image-free-png.png");

		String inputJSON = mapper.writeValueAsString(input);
		String outputJSON = mapper.writeValueAsString(updated);
		
		mvc.perform(put("/charactersheet/update/1").contentType(MediaType.APPLICATION_JSON).content(inputJSON)).andExpect(status().isOk()).andExpect(content().json(outputJSON));
	}

	@Test
	public void getIdTest() throws Exception{
		CharacterSheet test = new CharacterSheet(1L, "Bob", "Bobson", 1, "Monk", "Human", "Lawfull Good", "Urchin","Male", "https://www.freepngimg.com/thumb/machine/47280-8-rubber-duck-hq-image-free-png.png");
		
		String inputJSON = mapper.writeValueAsString(test);
		
		mvc.perform(get("/charactersheet/get/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(content().json(inputJSON));

	}

	@Test
	public void getAllTest() throws Exception{
		CharacterSheet test = new CharacterSheet(1L, "Bob", "Bobson", 1, "Monk", "Human", "Lawfull Good", "Urchin",
				"Male", "https://www.freepngimg.com/thumb/machine/47280-8-rubber-duck-hq-image-free-png.png");
		List<CharacterSheet> output = new ArrayList<>();
		output.add(test);

		String outputJSON = mapper.writeValueAsString(output);

		mvc.perform(get("/charactersheet/getAll").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().json(outputJSON));

	}

	@Test
	public void deleteTest() throws Exception{
		mvc.perform(delete("/charactersheet/delete/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());
		

	}
}
