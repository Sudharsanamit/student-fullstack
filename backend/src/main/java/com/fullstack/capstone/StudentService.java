package com.fullstack.capstone;


import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                    new StudentNotFoundException(
                        "Student not found with id " + id
                    ));
    }

    public List<Student> searchStudents(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    public Student addStudent(Student student) {
        student.setId(null);
        return repository.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = getStudentById(id);

        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setDepartment(updatedStudent.getDepartment());
        existing.setMarks(updatedStudent.getMarks());

        return repository.save(existing);
    }
    

    public void deleteStudent(Long id) {
        Student existing = getStudentById(id);
        repository.delete(existing);
    }
}
