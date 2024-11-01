package com.scrs.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.scrs.model.FacultyModel;

@Repository
public interface FacultyRepo extends JpaRepository<FacultyModel, UUID> {
	@Query("SELECT f FROM FacultyModel f WHERE f.username = ?1")
	FacultyModel getByUsername(String uname);
}
