/**
 * Create a Student Class
 * The class should have the private fields:
 * - name, year, email, specialization
 * The class should have means to modify these fields
 * The class should have means to access these fields
 */
class Student {
  // Private Fields
  #name               // String(fullname no space in between)
  #year               // Number
  #email              // String
  #specialization     // String(must be written in camelCase)

  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Student instance
   * RETURNS:   None
   */
  constructor(name, year, email, specialization) {
    this.#name = name;
    this.#year = year;
    this.#email = email;
    this.#specialization = specialization;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student name (String)
   */
  getName() {
    return this.#name;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student year (Number)
   */
  getYear() {
    return this.#year;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student email (String)
   */
  getEmail() {
    return this.#email;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student specialization (String)
   */
  getSpecialization() {
    return this.#specialization; 
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   Student object as string
   */
  getString() {
    return `Name: ${this.#name}, Year: ${this.#year}, Email: ${this.#email}, Specialization: ${this.#specialization}`;
  }

  /**
   * REQUIRES:  The student's new email (String)
   * EFFECTS:   Modifies the student's email to match
   * RETURNS:   None
   */
  setEmail(newEmail) {
    this.#email = newEmail;
  }

  /**
   * REQUIRES:  The student's new specialization (String)
   * EFFECTS:   Modifies the student's specialization to match
   * RETURNS:   The student specialization (String)
   */
  setSpecialization(newSpecialization) {
    this.#specialization = newSpecialization;
  }
}

module.exports = { Student }
