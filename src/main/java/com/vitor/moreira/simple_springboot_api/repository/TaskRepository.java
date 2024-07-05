package com.vitor.moreira.simple_springboot_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitor.moreira.simple_springboot_api.model.Task;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

}
