package com.qa.project2.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@Generated
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "charactersheet")
public class CharacterSheet {

	@Id
	@Column
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
	
	@Column
	private String charImage;

	public CharacterSheet(String forename, String surname, int level, String charClass, String race, String alignment, String background, String gender, String charImage) {
		this.forename = forename;
		this.surname = surname;
		this.level=level;
		this.charClass=charClass;
		this.race=race;
		this.alignment=alignment;
		this.background=background;
		this.gender=gender;
		this.charImage=charImage;

	}
}