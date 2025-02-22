document.addEventListener('DOMContentLoaded', function () {
    const attendanceForm = document.getElementById('attendance-form');
    const studentSelect = document.getElementById('student-select');
    const attendanceTableBody = document.querySelector('#attendance-table tbody');
    const attendanceIdField = document.getElementById('attendance-id');

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

    // Save data to local storage
    function saveAttendanceRecords() {
        localStorage.setItem('attendance', JSON.stringify(attendanceRecords));
    }

    // Add attendance record
    attendanceForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const attendanceId = attendanceIdField.value;
        const studentId = studentSelect.value;
        const status = document.querySelector('input[name="attendance-status"]:checked').value;
        const date = new Date().toLocaleDateString();

        const existingRecordIndex = attendanceRecords.findIndex(record => record.studentId === parseInt(studentId) && record.date === date);

        if (attendanceId) {
            // Edit existing attendance record
            const record = attendanceRecords.find(r => r.id === parseInt(attendanceId));
            record.status = status;
        } else {
            // Add new attendance record
            if (existingRecordIndex === -1) {
                const student = students.find(s => s.id == studentId);
                const record = {
                    id: attendanceRecords.length ? attendanceRecords[attendanceRecords.length - 1].id + 1 : 1,
                    studentId: student.id,
                    name: student.name,
                    status: status,
                    date: date
                };
                attendanceRecords.push(record);
            } else {
                alert('Attendance already marked for this student today.');
                return;
            }
        }

        saveAttendanceRecords();
        renderAttendanceTable();
        attendanceForm.reset();
        attendanceIdField.value = '';
    });

    // Add attendance record to table
    function addAttendanceToTable(record) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.studentId}</td>
            <td>${record.name}</td>
            <td>${record.status}</td>
            <td>${record.date}</td>
            <td class="actions">
                <button class="edit" onclick="editAttendance(${record.id})">Edit</button>
                <button class="delete" onclick="deleteAttendance(${record.id})">Delete</button>
            </td>
        `;
        attendanceTableBody.appendChild(row);
    }

    // Edit attendance
    window.editAttendance = function (id) {
        const record = attendanceRecords.find(r => r.id === id);
        if (record) {
            attendanceIdField.value = record.id;
            studentSelect.value = record.studentId;
            document.querySelector(`input[name="attendance-status"][value="${record.status}"]`).checked = true;
        }
    };

    // Delete attendance
    window.deleteAttendance = function (id) {
        attendanceRecords = attendanceRecords.filter(r => r.id !== id);
        saveAttendanceRecords();
        renderAttendanceTable();
    };

    // Render attendance table
    function renderAttendanceTable() {
        attendanceTableBody.innerHTML = '';
        attendanceRecords.forEach(record => addAttendanceToTable(record));
    }

    // Initial render
    populateStudentSelect();
    renderAttendanceTable();
});