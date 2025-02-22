document.addEventListener('DOMContentLoaded', function () {
    const studentForm = document.getElementById('student-form');
    const studentTableBody = document.querySelector('#student-table tbody');
    const courseSelect = document.getElementById('student-course');
    const totalStudents = document.getElementById('total-students');

    let students = [];
    let courses = [
        { id: 1, name: 'Mathematics' },
        { id: 2, name: 'Physics' },
        { id: 3, name: 'Chemistry' }
    ];

    // Populate Course Select Dropdown
    function populateCourseSelect() {
        courseSelect.innerHTML = '';
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.name;
            option.textContent = course.name;
            courseSelect.appendChild(option);
        });
    }

    // Add Student
    studentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const studentName = document.getElementById('student-name').value;
        const studentCourse = document.getElementById('student-course').value;

        if (studentName && studentCourse) {
            const student = {
                id: students.length + 1,
                name: studentName,
                course: studentCourse
            };
            students.push(student);
            addStudentToTable(student);
            updateTotalStudents();
            studentForm.reset();
        }
    });

    // Add Student to Table
    function addStudentToTable(student) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td class="actions">
                <button class="edit" onclick="editStudent(${student.id})">Edit</button>
                <button class="delete" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    }

    // Update Total Students
    function updateTotalStudents() {
        totalStudents.textContent = students.length;
    }

    // Edit Student
    window.editStudent = function (id) {
        const student = students.find(s => s.id === id);
        if (student) {
            document.getElementById('student-name').value = student.name;
            document.getElementById('student-course').value = student.course;
            deleteStudent(id);
        }
    };

    // Delete Student
    window.deleteStudent = function (id) {
        students = students.filter(s => s.id !== id);
        renderStudentTable();
        updateTotalStudents();
    };

    // Render Student Table
    function renderStudentTable() {
        studentTableBody.innerHTML = '';
        students.forEach(student => addStudentToTable(student));
    }

    // Initial Render
    populateCourseSelect();
    renderStudentTable();
    updateTotalStudents();
});