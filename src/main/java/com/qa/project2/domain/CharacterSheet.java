package com.qa.project2.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class CharacterSheet {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	@NotNull
	private String forename;

	@Column
	private String surname;

	@Column
	@NotNull
	private int level;

	@Column
	@NotNull
	private String charClass;

	@Column
	@NotNull
	private String race;

	@Column
	@NotNull
	private String alignment;

	@Column
	@NotNull
	private String background;
	
	@Column
	@NotNull
	private String gender;

	public CharacterSheet(String forename, String surname, int level, String charClass, String race, String alignment, String background, String gender) {
		this.forename = forename;
		this.surname = surname;
		this.level=level;
		this.charClass=charClass;
		this.race=race;
		this.alignment=alignment;
		this.background=background;
		this.gender=gender;

	}

}
