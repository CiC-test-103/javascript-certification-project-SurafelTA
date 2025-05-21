const { Student } = require('./Student');

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

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

  removeStudent(email) {
    if (!this.head) return;

    if (this.head.data.getEmail() === email) {
      this.head = this.head.next;
      this.length--;
      if (!this.head) this.tail = null;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data.getEmail() === email) {
        current.next = current.next.next;
        this.length--;
        if (!current.next) this.tail = current;
        return;
      }
      current = current.next;
    }
  }

  findStudent(email) {
    let current = this.head;
    while (current) {
      if (current.data.getEmail() === email) return current.data;
      current = current.next;
    }
    return -1;
  }

  clearStudents() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  displayStudents() {
    const names = [];
    let current = this.head;
    while (current) {
      names.push(current.data.getName());
      current = current.next;
    }
    return names.join(', ');
  }

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
        age: student.age,
      });
      current = current.next;
    }

    const fs = require('fs').promises;
    await fs.writeFile(fileName, JSON.stringify(students, null, 2));
  }

  async loadFromJSON(fileName) {
    const fs = require('fs').promises;
    const data = await fs.readFile(fileName, 'utf-8');
    const students = JSON.parse(data);

    this.clearStudents();

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

module.exports = { LinkedList };
