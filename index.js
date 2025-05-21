const readline = require('readline');
const { Student } = require('./Student');
const { StudentManagementSystem } = require('./StudentManagementSystem'); // your LinkedList logic

const studentManagementSystem = new StudentManagementSystem();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>'
});

rl.prompt();

rl.on('line', async (input) => {
  await handleCommand(input);
  rl.prompt();
});

// Your teacher's provided function (DO NOT CHANGE STRUCTURE OR COMMENTS)
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
      console.log('Adding student...');
      const [name, year, email, specialization] = args;
      // --------> WRITE YOUR CODE BELOW
      const newStudent = new Student(name, Number(year), email, specialization);
      studentManagementSystem.addStudent(newStudent);
      console.log('Current students:', studentManagementSystem.displayStudents());
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'remove':
      console.log('Removing student...');
      // --------> WRITE YOUR CODE BELOW
      const removeEmail = args[0];
      studentManagementSystem.removeStudent(removeEmail);
      console.log('Current students:', studentManagementSystem.displayStudents());
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'display':
      console.log('Displaying students...');
      // --------> WRITE YOUR CODE BELOW
      const studentsList = studentManagementSystem.displayStudents();
      if (studentsList) {
        console.log(studentsList);
      } else {
        console.log('No students in the system.');
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'find':
      console.log('Finding student...');
      // --------> WRITE YOUR CODE BELOW
      const findEmail = args[0];
      const foundStudent = studentManagementSystem.findStudent(findEmail);
      if (foundStudent !== -1) {
        console.log(foundStudent.getString());
      } else {
        console.log('Student does not exist');
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'save':
      console.log('Saving data...');
      // --------> WRITE YOUR CODE BELOW
      const saveFileName = args[0];
      await studentManagementSystem.saveToJson(saveFileName);
      console.log(`Data saved to ${saveFileName}`);
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'load':
      console.log('Loading data...');
      // --------> WRITE YOUR CODE BELOW
      const loadFileName = args[0];
      await studentManagementSystem.loadFromJSON(loadFileName);
      console.log('Current students:', studentManagementSystem.displayStudents());
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'clear':
      console.log('Clearing data...');
      // --------> WRITE YOUR CODE BELOW
      studentManagementSystem.clearStudents(); // fixed: now a public method
      console.log('All students cleared.');
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'q':
      console.log('Exiting...');
      rl.close();
      break;

    default:
      console.log('Unknown command. Type "help" for a list of commands.');
      break;
  }
}
