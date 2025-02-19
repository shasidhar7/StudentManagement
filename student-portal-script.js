document.addEventListener('DOMContentLoaded', function () {
    const courseList = document.getElementById('course-list');
    const progressList = document.getElementById('progress-list');
    const attendanceTableBody = document.querySelector('#attendance-table tbody');
    const studentDetails = document.getElementById('student-details');
    const logoutBtn = document.getElementById('logout-btn');

    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    let attendanceRecords = JSON.parse(localStorage.getItem('attendance')) || [];
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Logout functionality
    logoutBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to logout?')) {
            alert('Logged out successfully!');
            window.location.href = 'index.html'; // Redirect to login page
        }
    });

    // Display available courses
    function renderCourses() {
        courseList.innerHTML = '';
        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <h3>${course.name}</h3>
                <p>Course ID: ${course.id}</p>
                <button onclick="enrollCourse(${course.id})">Enroll</button>
            `;
            courseList.appendChild(card);
        });
    }

    // Enroll in a course
    window.enrollCourse = function (courseId) {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            alert(`Enrolled in ${course.name}`);
            // Add logic to track enrollment (e.g., save to localStorage)
        }
    };

    // Display course progress
    function renderProgress() {
        progressList.innerHTML = '';
        // Add logic to fetch and display progress
    }

    // Display attendance report
    function renderAttendance() {
        attendanceTableBody.innerHTML = '';
        attendanceRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.date}</td>
                <td>${record.status}</td>
            `;
            attendanceTableBody.appendChild(row);
        });
    }

    // Display personal data
    function renderPersonalData() {
        const student = students[0]; // Assuming the first student is logged in
        if (student) {
            studentDetails.innerHTML = `
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Course:</strong> ${student.course}</p>
            `;
        }
    }

    // Initial Render
    renderCourses();
    renderProgress();
    renderAttendance();
    renderPersonalData();
});