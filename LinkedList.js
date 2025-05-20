// Necessary Imports (you will need to use this)
const { Student } = require('./Student');

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data;  // Student
  next;  // Object

  /**
   * REQUIRES: The fields specified above
   * EFFECTS: Creates a new Node instance
   * RETURNS: None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head;    // Object
  tail;    // Object
  length;  // Number representing size of LinkedList

  /**
   * REQUIRES: None
   * EFFECTS: Creates a new LinkedList instance (empty)
   * RETURNS: None
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES: A new student (Student)
   * EFFECTS: Adds a Student to the end of the LinkedList
   * RETURNS: None
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
   * REQUIRES: email(String)
   * EFFECTS: Removes a student by email (assume unique)
   * RETURNS: None
   */
  removeStudent(email) {
    if (!this.head) return;

    if (this.head.data.getEmail() === email) {
      this.head = this.head.next;
      this.length--;
      if (!this.head) {
        this.tail = null;
      }
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data.getEmail() === email) {
        current.next = current.next.next;
        this.length--;
        if (!current.next) {
          this.tail = current;
        }
        return;
      }
      current = current.next;
    }
  }

  /**
   * REQUIRES: email (String)
   * EFFECTS: None
   * RETURNS: The Student or -1 if not found
   */
  findStudent(email) {
    let current = this.head;
    while (current) {
      if (current.data.getEmail() === email) {
        return current.data;
      }
      current = current.next;
    }
    return -1;
  }

  /**
   * REQUIRES: None
   * EFFECTS: Clears all students from the Linked List
   * RETURNS: None
   */
  #clearStudents() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES: None
   * EFFECTS: None
   * RETURNS: LinkedList as a String for console.log in caller
   */
  displayStudents() {
    const names = [];
    let current = this.head;
    while (current) {
      names.push(current.data.getName());
      current = current.next;
    }
    return names.join(', ');
  }

  /**
   * REQUIRES: None
   * EFFECTS: None
   * RETURNS: A sorted array of students by name
   */
  #sortStudentsByName() {
    const students = [];
    let current = this.head;
    while (current) {
      students.push(current.data);
      current = current.next;
    }

    return students.sort((a, b) => 
      a.getName().localeCompare(b.getName())
    );
  }

  /**
   * REQUIRES: specialization (String)
   * EFFECTS: None
   * RETURNS: An array of students matching the specialization
   */
  filterBySpecialization(specialization) {
    return this.#sortStudentsByName().filter(student =>
      student.getSpecialization().toLowerCase() === specialization.toLowerCase()
    );
  }

  /**
   * REQUIRES: minAge (Number)
   * EFFECTS: None
   * RETURNS: An array of students who are at least minAge
   */
  filterByMinAge(minAge) {
    return this.#sortStudentsByName().filter(student => student.getAge() >= minAge );
  }

  /**
   * REQUIRES: A valid file name (String)
   * EFFECTS: Writes the LinkedList to a JSON file
   * RETURNS: None
   */
  async saveToJson(fileName) {
    const students = [];
    let current = this.head;

    while (current) {
      const student = current.data;
      students.push({
        name: student.getName(),
        year: student.getYear(),
        email: student.getEmail(),
        specialization: student.getSpecialization(),
        age: student.age
      });
      current = current.next;
    }

    const fs = require('fs').promises;
    await fs.writeFile(fileName, JSON.stringify(students, null, 2));
  }

  /**
   * REQUIRES: A valid file name (String) that exists
   * EFFECTS: Loads data from the specified fileName
   * RETURNS: None
   */
  async loadFromJSON(fileName) {
    const fs = require('fs').promises;
    const data = await fs.readFile(fileName, 'utf-8');
    const students = JSON.parse(data);

    this.#clearStudents();

    for (const studentData of students) {
      this.addStudent(new Student( studentData.name, studentData.year, 
        studentData.email, studentData.specialization, studentData.age ));
    }
  }
}

module.exports = { LinkedList };