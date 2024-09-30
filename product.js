// On page load, check if we're editing a student
document.addEventListener('DOMContentLoaded', function () {
    const editStudentData = JSON.parse(localStorage.getItem('editStudentData'));
    const registerButton = document.getElementById('register');

    if (editStudentData) {
        // Populate the form with the existing student data
        document.getElementById('firstName').value = editStudentData.firstName || '';
        document.getElementById('lastName').value = editStudentData.lastName || '';
        document.getElementById('email').value = editStudentData.email || '';
        document.getElementById('studentID').value = editStudentData.studentID || '';
        document.getElementById('phone').value = editStudentData.phone || '';
        document.getElementById('Studentclass').value = editStudentData.Studentclass || '';

        // Update button text to "Update"
        if (registerButton) {
            registerButton.innerHTML = 'Update';
        }
    } else {
        // If we're adding a new student, ensure the button says "Register"
        if (registerButton) {
            registerButton.innerHTML = 'Register';
        }
    }
});


// Form submission logic (for both new registration and editing)
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const studentID = document.getElementById('studentID').value;
    const phone = document.getElementById('phone').value;
    const Studentclass = document.getElementById('Studentclass').value;
    
    // Create student object
    const student = new Student(firstName, lastName, email, studentID, phone, Studentclass);

    // Retrieve totalStudents from localStorage or initialize if not present
    let totalStudents = JSON.parse(localStorage.getItem('totalStudents')) || [];
    const editStudentIndex = localStorage.getItem('editStudentIndex');

    if (editStudentIndex !== null) {
        // Update existing student data
        totalStudents[editStudentIndex] = student.toJSON();
        localStorage.removeItem('editStudentIndex');  // Clear the edit index after editing
        localStorage.removeItem('editStudentData');   // Clear the edit data after editing
        alert('Student updated successfully!');
    } else {
        // Add new student
        totalStudents.push(student.toJSON());
        alert('Student registered successfully!');
    }
    
    // Update totalStudents in localStorage
    localStorage.setItem('totalStudents', JSON.stringify(totalStudents));

    // Reset the form
    document.getElementById('studentForm').reset();

    // Optionally, redirect back to index.html
    window.location.href = 'index.html';
});
