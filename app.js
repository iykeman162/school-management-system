// Student class to represent a student
class Student {
    constructor(id, name, grade) {
        this.id = id;
        this.name = name;
        this.grade = grade;
    }
}

// StudentManager class to manage student data
class StudentManager {
    constructor() {
        this.students = [];
    }

    // Add new student
    addStudent(id, name, grade) {
        const newStudent = new Student(id, name, grade);
        this.students.push(newStudent);
        this.displayStudents();
    }

    // Get all students
    getAllStudents() {
        return this.students;
    }

    // Delete a student by ID
    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
        this.displayStudents();
    }

    // Search students by name or ID
    searchStudent(query) {
        return this.students.filter(student =>
            student.name.toLowerCase().includes(query.toLowerCase()) ||
            student.id.toString().includes(query)
        );
    }

    // Display students in the table
    displayStudents() {
        const studentTableBody = document.getElementById('student-table-body');
        studentTableBody.innerHTML = '';  // Clear existing data

        this.students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.grade}</td>
                <td><button onclick="deleteStudent(${student.id})">Delete</button></td>
            `;
            studentTableBody.appendChild(row);
        });
    }
}

// Instantiate StudentManager
const studentManager = new StudentManager();

// Handle form submission to add new student
const studentForm = document.getElementById('student-form');
studentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const studentId = document.getElementById('student-id').value;
    const studentName = document.getElementById('student-name').value;
    const studentGrade = document.getElementById('student-grade').value;

    studentManager.addStudent(studentId, studentName, studentGrade);

    // Clear form inputs
    studentForm.reset();
});

// Function to delete a student
function deleteStudent(id) {
    studentManager.deleteStudent(id);
}

// Handle search functionality
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    const query = document.getElementById('search-query').value;
    const searchResults = studentManager.searchStudent(query);

    const searchResultsList = document.getElementById('search-results');
    searchResultsList.innerHTML = '';

    if (searchResults.length > 0) {
        searchResults.forEach(student => {
            const li = document.createElement('li');
            li.textContent = `ID: ${student.id}, Name: ${student.name}, Grade: ${student.grade}`;
            searchResultsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No results found';
        searchResultsList.appendChild(li);
    }
});
