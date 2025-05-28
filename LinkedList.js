// Necessary Imports (you will need to use this)
const { Student } = require('./Student')
const fs = require('fs').promises; 

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
  const newNode = new Node(newStudent);

  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }

  this.length++;
}


  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
 removeStudent(email) {
  // If the list is empty, just return
  if (this.head === null) {
    return;
  }

  // If the first student's email matches, remove the head
  if (this.head.data.getEmail() === email) {
    this.head = this.head.next; // move head to next node
    if (this.head === null) {
      this.tail = null;  // if list is empty now, set tail to null
    }
    this.length = this.length - 1; // decrease length by 1
    return; // stop here because we removed the student
  }

  // Start checking from the first node
  let current = this.head;

  // Loop through nodes while there is a next node
  while (current.next !== null) {
    // If the next node's email matches, remove that node
    if (current.next.data.getEmail() === email) {
      current.next = current.next.next;  // skip the next node
      
      // If after removal, next is null, update tail to current node
      if (current.next === null) {
        this.tail = current;
      }
      this.length = this.length - 1; // decrease length
      return; // stop after removal
    }
    current = current.next; // move to next node and keep looking
  }
}


  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
  // Start from the first node (head)
  let current = this.head;

  // Loop through the list until there are no more nodes
  while (current !== null) {
    // Check if current student's email matches the one we're looking for
    if (current.data.getEmail() === email) {
      return current.data;  // Return the student object if found
    }
    current = current.next;  // Move to the next node
  }

  // If we reach here, student was not found
  return -1;
}


  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  #clearStudents() {
  // Remove all students by setting head and tail to null
  this.head = null;
  this.tail = null;

  // Set length to 0 because the list is now empty
  this.length = 0;
}

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
 displayStudents() {
  // Start from the head of the list
  let current = this.head;
  
  // This array will hold student names as strings
  let students = [];

  // Loop through all nodes in the list
  while (current !== null) {
    // Add the student's name to the array
    students.push(current.data.getName());
    
    // Move to the next node
    current = current.next;
  }

  // Join all names with a comma and a space, then return as a string
  return students.join(', ');
}

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
#sortStudentsByName() {
  // Create an empty array to hold students
  let studentsArray = [];

  // Start from the head of the list
  let current = this.head;

  // Loop through all nodes and add student objects to the array
  while (current !== null) {
    studentsArray.push(current.data);
    current = current.next;
  }

  // Sort the array by student name (alphabetically)
  studentsArray.sort((a, b) => {
    // Get names of two students to compare
    let nameA = a.getName().toLowerCase();
    let nameB = b.getName().toLowerCase();

    // Compare names and return sorting order
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  // Return the sorted array of students
  return studentsArray;
}


  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
filterBySpecialization(specialization) {
  // First, get all students sorted by name using our helper method
  const sortedStudents = this.#sortStudentsByName();

  // Filter the students to only those with the given specialization
  const filteredStudents = sortedStudents.filter(student => {
    return student.getSpecialization() === specialization;
  });

  // Return the filtered and sorted array of students
  return filteredStudents;
}


  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
 filterByMinAge(minAge) {
  // Get all students sorted by name using our helper method
  const sortedStudents = this.#sortStudentsByName();

  // Filter students whose year (age) is at least minAge
  const filteredStudents = sortedStudents.filter(student => {
    return student.getYear() >= minAge;
  });

  // Return the filtered and sorted list of students
  return filteredStudents;
}


  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */

async saveToJson(fileName) {
  // Create an array to hold plain student objects (not the Student class instances)
  let studentsArray = [];

  // Start from the head of the list
  let current = this.head;

  // Loop through each node and get student data as plain object
  while (current !== null) {
    // Use getters to get student info and build a plain object
    const studentData = {
      name: current.data.getName(),
      year: current.data.getYear(),
      email: current.data.getEmail(),
      specialization: current.data.getSpecialization()
    };

    studentsArray.push(studentData);
    current = current.next;
  }

  // Convert the array to JSON string
  const jsonString = JSON.stringify(studentsArray, null, 2);

  // Write the JSON string to the specified file
  await fs.writeFile(fileName, jsonString);

  // No return needed
}

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
async loadFromJSON(fileName) {
  // Read the JSON file content as a string
  const data = await fs.readFile(fileName, 'utf-8');

  // Convert the JSON string into an array of plain student objects
  const studentsArray = JSON.parse(data);

  // Clear the current linked list to overwrite with new data
  this.#clearStudents();

  // Loop over each plain student object in the array
  for (let studentObj of studentsArray) {
    // Create a new Student instance using the data
    const student = new Student(
      studentObj.name,
      studentObj.year,
      studentObj.email,
      studentObj.specialization
    );

    // Add the new Student object to the linked list
    this.addStudent(student);
  }
}

}

module.exports = { LinkedList }
