document.addEventListener('DOMContentLoaded', function () {
    const attendanceForm = document.getElementById('attendance-form');
    const studentSelect = document.getElementById('student-select');
    const attendanceTableBody = document.querySelector('#attendance-table tbody');

    let students = JSON.parse(localStorage.getItem('students')) || [];
    let attendanceRecords = JSON.parse(localStorage.getItem('attendance')) || [];

    // Populate student dropdown
    function populateStudentSelect() {
        studentSelect.innerHTML = '';
        students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = student.name;
            studentSelect.appendChild(option);
        });
    }

    // Add attendance record
    attendanceForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const studentId = studentSelect.value;
        const status = document.querySelector('input[name="attendance-status"]:checked').value;

        if (studentId && status) {
            const student = students.find(s => s.id == studentId);
            const record = {
                id: attendanceRecords.length + 1,
                studentId: student.id,
                name: student.name,
                status: status,
                date: new Date().toLocaleDateString()
            };
            attendanceRecords.push(record);
            localStorage.setItem('attendance', JSON.stringify(attendanceRecords));
            addAttendanceToTable(record);
            attendanceForm.reset();
        }
    });

    // Add attendance record to table
    function addAttendanceToTable(record) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.studentId}</td>
            <td>${record.name}</td>
            <td>${record.status}</td>
            <td>${record.date}</td>
        `;
        attendanceTableBody.appendChild(row);
    }

    // Render attendance table
    function renderAttendanceTable() {
        attendanceTableBody.innerHTML = '';
        attendanceRecords.forEach(record => addAttendanceToTable(record));
    }

    // Initial Render
    populateStudentSelect();
    renderAttendanceTable();
});