const { Student } = require('./Student'); // Import Student class from another file

// Node class represents each element in the linked list
class Node {
  constructor(data, next = null) {
    this.data = data;   // Store the student data object
    this.next = next;   // Pointer to the next node in the list, default is null
  }
}

// LinkedList class manages the collection of student nodes
class LinkedList {
  constructor() {
    this.head = null;   // Head points to the first node in the list
    this.tail = null;   // Tail points to the last node for easy addition at end
    this.length = 0;    // Keeps track of the number of nodes/students in the list
  }

  // Add a new student to the end of the linked list
  addStudent(newStudent) {
    const newNode = new Node(newStudent); // Create a new node containing the student

    if (!this.head) {
      // If list is empty, head and tail both point to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, add new node after tail and update tail reference
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++; // Increase the length as we added a new student
  }

  // Remove a student from the list by email address
  removeStudent(email) {
    if (!this.head) return; // If list is empty, nothing to remove

    // Check if the head is the student to remove
    if (this.head.data.getEmail() === email) {
      this.head = this.head.next; // Remove the head by moving it to next node
      this.length--;              // Decrease the list length

      if (!this.head) {
        // If the list is now empty, update tail to null
        this.tail = null;
      }
      return;
    }

    // Otherwise, traverse the list to find and remove the student
    let current = this.head;
    while (current.next) {
      if (current.next.data.getEmail() === email) {
        current.next = current.next.next; // Bypass the node to remove it
        this.length--;                     // Decrease length

        if (!current.next) {
          // If removed node was tail, update tail pointer
          this.tail = current;
        }
        return;
      }
      current = current.next; // Move to the next node
    }
  }

  // Find and return a student by email
  findStudent(email) {
    let current = this.head;

    while (current) {
      if (current.data.getEmail() === email) {
        return current.data; // Found student, return it
      }
      current = current.next; // Move to next node
    }
    return -1; // Not found, return -1
  }

  // Clear the entire linked list (remove all students)
  clearStudents() {
    this.head = null;  // Remove reference to the first node
    this.tail = null;  // Remove reference to the last node
    this.length = 0;   // Reset length to zero
  }

  // Return a string listing all student names separated by commas
  displayStudents() {
    const names = [];
    let current = this.head;

    // Traverse each node and collect student names
    while (current) {
      names.push(current.data.getName()); // Assuming getName() returns the student name
      current = current.next;
    }

    return names.join(', '); // Join names into a comma-separated string
  }

  // Save the current list of students to a JSON file asynchronously
  async saveToJson(fileName) {
    const students = [];
    let current = this.head;

    // Traverse the list and prepare a plain object for each student
    while (current) {
      const student = current.data;
      students.push({
        name: student.getName(),
        year: student.getYear(),
        email: student.getEmail(),
        specialization: student.getSpecialization(),
        age: student.age, // assuming age is a property
      });
      current = current.next;
    }

    // Use Node.js file system promises to write JSON file
    const fs = require('fs').promises;
    await fs.writeFile(fileName, JSON.stringify(students, null, 2));
  }

  // Load students from a JSON file and rebuild the linked list asynchronously
  async loadFromJSON(fileName) {
    const fs = require('fs').promises;

    // Read and parse the JSON file contents
    const data = await fs.readFile(fileName, 'utf-8');
    const students = JSON.parse(data);

    this.clearStudents(); // Clear current list before loading new students

    // Create new Student instances and add them to the list
    for (const studentData of students) {
      this.addStudent(
        new Student(
          studentData.name,
          studentData.year,
          studentData.email,
          studentData.specialization,
          studentData.age
        )
      );
    }
  }
}

module.exports = { LinkedList }; // Export the LinkedList class for use elsewhere
