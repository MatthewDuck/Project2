package com.qa.project2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qa.project2.domain.CharacterSheet;

@Repository
public interface CharacterSheetRepo extends JpaRepository<CharacterSheet, Long>{

}
