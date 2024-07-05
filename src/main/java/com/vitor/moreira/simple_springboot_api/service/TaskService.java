package com.vitor.moreira.simple_springboot_api.service;

import com.vitor.moreira.simple_springboot_api.model.Task;
import com.vitor.moreira.simple_springboot_api.model.User;
import com.vitor.moreira.simple_springboot_api.repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    public Task findById(Integer id){
        Optional<Task> task = this.taskRepository.findById(id);
        return task.orElseThrow(()-> new RuntimeException(
                "Tarefa nao encontrada id:" + id + ", Tipo: " +
                        Task.class.getName()
        ));
    }

    @Transactional
    public Task create(Task obj){
        User user = this.userService.findById(obj.getUser().getId());
        obj.setId(null);
        obj.setUser(user);
        obj = this.taskRepository.save(obj);
                return obj;
    }



}
