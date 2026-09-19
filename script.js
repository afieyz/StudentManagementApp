// Starter student records
const starterStudents = [
    {
        name: "Ahmad",
        course: "Computer Science",
        age: 21
    },
    {
        name: "Siti",
        course: "Information Technology",
        age: 22
    },
    {
        name: "Daniel",
        course: "Software Engineering",
        age: 20
    }
];


// Load student records
let allStudents =
    JSON.parse(localStorage.getItem("studentRecords"));

// First time opening the app
if (allStudents === null) {

    const addedStudents =
        JSON.parse(localStorage.getItem("students")) || [];

    // Combine starter students and added students
    allStudents = [
        ...starterStudents,
        ...addedStudents
    ];

    // Save all student records
    localStorage.setItem(
        "studentRecords",
        JSON.stringify(allStudents)
    );
}


// Get HTML elements
const studentList =
    document.getElementById("studentList");

const searchInput =
    document.getElementById("searchInput");

const courseFilter =
    document.getElementById("courseFilter");


// Update course filter
function updateCourseFilter() {

    courseFilter.innerHTML =
        '<option value="All">All Courses</option>';

    const courses = [];

    allStudents.forEach(function(student) {

        if (!courses.includes(student.course)) {
            courses.push(student.course);
        }
    });

    courses.forEach(function(course) {

        const option =
            document.createElement("option");

        option.value = course;
        option.textContent = course;

        courseFilter.appendChild(option);
    });
}


// Display student records
function displayStudents(students) {

    studentList.innerHTML = "";

    students.forEach(function(student) {

        const studentCard =
            document.createElement("div");

        studentCard.innerHTML = `
            <h3>${student.name}</h3>
            <p>Course: ${student.course}</p>
            <p>Age: ${student.age}</p>

            <button onclick="showDeleteConfirmation(${allStudents.indexOf(student)})">
                Delete
            </button>
        `;

        studentList.appendChild(studentCard);

        const line =
            document.createElement("hr");

        studentList.appendChild(line);
    });
}


// Delete confirmation
function showDeleteConfirmation(index) {

    const student =
        allStudents[index];

    const confirmation =
        confirm(
            "Delete Student\n\n" +
            "Are you sure you want to delete " +
            student.name +
            "?"
        );

    // Cancel deletion
    if (confirmation === false) {
        return;
    }

    // Confirm deletion
    deleteStudent(index);
}


// Delete student
function deleteStudent(index) {

    // Remove student from list
    allStudents.splice(index, 1);

    // Save updated student records
    localStorage.setItem(
        "studentRecords",
        JSON.stringify(allStudents)
    );

    // Update course dropdown
    updateCourseFilter();

    // Update student list
    filterStudents();
}


// Search and filter students
function filterStudents() {

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedCourse =
        courseFilter.value;

    const filteredStudents =
        allStudents.filter(function(student) {

            const matchesName =
                student.name
                    .toLowerCase()
                    .includes(searchText);

            const matchesCourse =
                selectedCourse === "All" ||
                student.course === selectedCourse;

            return matchesName && matchesCourse;
        });

    displayStudents(filteredStudents);
}


// Event listeners

// Search when user types a name
searchInput.addEventListener("input", function() {
    filterStudents();
});

// Filter when user selects a course
courseFilter.addEventListener("change", function() {
    filterStudents();
});


// Load page
updateCourseFilter();
displayStudents(allStudents);