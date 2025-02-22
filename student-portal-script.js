document.addEventListener('DOMContentLoaded', function () {
    const courseList = document.getElementById('course-list');
    const progressList = document.getElementById('progress-list');
    const attendanceTableBody = document.querySelector('#attendance-table tbody');
    const studentDetails = document.getElementById('student-details');
    const logoutBtn = document.getElementById('logout-btn');

    // Get logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    // if (!loggedInUser) {
    //     alert('No user logged in. Redirecting to login page...');
    //     window.location.href = 'index.html'; // Redirect to login page
    //     return;
    // }

    // Sample data for courses and attendance
    let courses = JSON.parse(localStorage.getItem('courses')) || [
        { id: 1, name: 'Introduction to Computer Science' },
        { id: 2, name: 'Web Development Fundamentals' }
    ];

    let attendanceRecords = JSON.parse(localStorage.getItem('attendance')) || [];
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Logout functionality
    logoutBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('loggedInUser'); // Clear logged-in user data
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
            // Save enrollment for the logged-in student
            const student = students.find(s => s.email === loggedInUser.email);
            if (student) {
                if (!student.enrolledCourses) {
                    student.enrolledCourses = [];
                }
                student.enrolledCourses.push(course);
                localStorage.setItem('students', JSON.stringify(students));
            }
        }
    };

    // Display course progress
    function renderProgress() {
        progressList.innerHTML = '';
        const student = students.find(s => s.email === loggedInUser.email);
        if (student && student.enrolledCourses) {
            student.enrolledCourses.forEach(course => {
                const progressItem = document.createElement('div');
                progressItem.className = 'progress-item';
                progressItem.innerHTML = `
                    <h3>${course.name}</h3>
                    <p>Progress: 0%</p> <!-- Add actual progress logic here -->
                `;
                progressList.appendChild(progressItem);
            });
        }
    }

    // Display attendance report
    function renderAttendance() {
        attendanceTableBody.innerHTML = '';
        const studentAttendance = attendanceRecords.filter(record => record.email === loggedInUser.email);
        studentAttendance.forEach(record => {
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
        const student = students.find(s => s.email === loggedInUser.email);
        if (student) {
            studentDetails.innerHTML = `
                <p><strong>Name:</strong> ${student.username}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Enrolled Courses:</strong> ${student.enrolledCourses ? student.enrolledCourses.map(course => course.name).join(', ') : 'None'}</p>
            `;
        }
    }

    // Initial Render
    renderCourses();
    renderProgress();
    renderAttendance();
    renderPersonalData();
});