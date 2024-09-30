// Student Class Definition
class Student {
    constructor(firstName, lastName, email, studentID, phone, Studentclass) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.studentID = studentID;
        this.phone = phone;
        this.Studentclass = Studentclass;
        
    }

    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            studentID: this.studentID,
            phone: this.phone,
            Studentclass: this.Studentclass,
            
        };
    }
}

// Global Variables for Pagination
let currentPage = 1;
const pageSize = 3; // Number of students per page

// Fetch data from localStorage and display in the table
function fetchStudents() {
    let totalStudents = JSON.parse(localStorage.getItem('totalStudents')) || [];

    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = ''; // Clear table before re-rendering

    // Calculate the range of students to display for the current page
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const studentsToDisplay = totalStudents.slice(start, end);

    studentsToDisplay.forEach((studentData, index) => {
        const student = new Student(
            studentData.firstName,
            studentData.lastName,
            studentData.email,
            studentData.studentID,
            studentData.phone,
            studentData.Studentclass,
            
        );

        const row = `
           <tr>
            <td>${start + index + 1}</td>  <!-- Index adjusted for pagination -->
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.studentID}</td>
            <td>${student.Studentclass}</td>
            <td>${student.phone}</td>
            <td>${student.email}</td>
            <td>
              <button onclick="editStudent(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        `;
        studentTableBody.innerHTML += row;
    });

    // Update the pagination controls
    updatePagination(totalStudents.length);
}

// Fetch student data for editing
function editStudent(index) {
    // Calculate the actual index in the total students array based on the page
    const actualIndex = (currentPage - 1) * pageSize + index;

    let totalStudents = JSON.parse(localStorage.getItem('totalStudents')) || [];
    let student = totalStudents[actualIndex];
    
    // Store the student data and the index to localStorage
    localStorage.setItem('editStudentIndex', actualIndex);  // Save the index of the student being edited
    localStorage.setItem('editStudentData', JSON.stringify(student));  // Save the student data

    // Redirect to product.html to edit the data
    
    window.location.href = 'product.html';
}

// Delete a student by index
function deleteStudent(index) {
    // Calculate the actual index in the total students array
    const actualIndex = (currentPage - 1) * pageSize + index;

    let totalStudents = JSON.parse(localStorage.getItem('totalStudents')) || [];
    totalStudents.splice(actualIndex, 1);
    localStorage.setItem('totalStudents', JSON.stringify(totalStudents));
    fetchStudents(); // Refresh table
}

// Update pagination controls
function updatePagination(totalStudents) {
    const paginationSection = document.querySelector('.pagination');
    paginationSection.innerHTML = ''; // Clear existing pagination

    const totalPages = Math.ceil(totalStudents / pageSize);

    // "Previous" button
    paginationSection.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Previous" onclick="changePage(${currentPage - 1})">
              <span aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        paginationSection.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    // "Next" button
    paginationSection.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Next" onclick="changePage(${currentPage + 1})">
              <span aria-hidden="true">»</span>
            </a>
        </li>
    `;
}

// Change page function
function changePage(page) {
    const totalStudents = JSON.parse(localStorage.getItem('totalStudents')).length || 0;
    const totalPages = Math.ceil(totalStudents / pageSize);

    // Ensure the page is within valid range
    if (page < 1 || page > totalPages) return;

    // Update the current page and fetch students again
    currentPage = page;
    fetchStudents();
}


// Search er jonno ja ja lage
// Handle Enter key press in search input
function handleEnter(event) {
    if (event.key === 'Enter') {  // Check if the pressed key is "Enter"
        searchStudents();  // Call the search function
    }
}

// Search Functionality
function searchStudents() {
    const query = document.getElementById('searchInput').value.toLowerCase();  // Get the search query and convert to lowercase
    let totalStudents = JSON.parse(localStorage.getItem('totalStudents')) || [];

    // Filter the students based on the query
    const filteredStudents = totalStudents.filter(student => {
        const fullName = `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`;
        const studentID = student.studentID.toLowerCase();
        const studentClass = student.Studentclass.toLowerCase();

        // Check if the query matches the student's full name, roll ID, or class
        return fullName.includes(query) || studentID.includes(query) || studentClass.includes(query);
    });

    // Render the filtered student list
    renderStudents(filteredStudents);
}

// Helper function to render the filtered student list
function renderStudents(students) {
    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = ''; // Clear table before re-rendering

    students.forEach((studentData, index) => {
        const student = new Student(
            studentData.firstName,
            studentData.lastName,
            studentData.email,
            studentData.studentID,
            studentData.phone,
            studentData.Studentclass,
            
        );

        const row = `
           <tr>
            <td>${index + 1}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.studentID}</td>
            <td>${student.Studentclass}</td>
            <td>${student.phone}</td>
            <td>${student.email}</td>
            <td>
              <button onclick="editStudent(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        `;
        studentTableBody.innerHTML += row;
    });
}


// On page load, fetch students
window.onload = function () {
    fetchStudents();
};
