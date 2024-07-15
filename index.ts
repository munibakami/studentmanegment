import inquirer from "inquirer";

class student{
  static counter = 10000;  
id:   number;
name:  string;
courses:  string[];
balance:   number;

constructor(name: string){
    this.id = student.counter++;
    this.name = name;
   this.courses = [];  //initialize an empty array for courses
    this.balance = 100;
}
//method to enroll a student in a course
//tabnine :test|explain|document|ask
enroll_course(course: string){
    this.courses.push(course);
}
//method to view a student balance 
//tabnine :test|explain|document|ask
    view_balance(){
        console.log(`Balance for ${this.name} : ${this.balance}`);
    }

    //method to view a pay student fees 
    //tabnine :test|explain|document|ask
    pay_fees(amount:number){
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
    }

//method to view a student balance 
//tabnine :test|explain|document|ask
show_status(){
    console.log(`ID:${this.id}`);
    console.log(`Name:${this.name}`);
    console.log(`Courses:${this.courses}`);
    console.log(`Balance:${this.balance}`);
}
}
//define a student_maneger
class Student_manager{
    students: student[]

constructor(){
this.students = [];
}
//method to add a new student in a coures
add_student(name: string){
    let student = new  Student(name);
    this.students.push(student);
    console.log(`Student:${name} added successfully. Student ID :${student.id}`);

}
//METHOD TO ENROLL A STUDENT IN A COURES
enroll_student(student_id : number, course: string){
    let student = this.students.find(std => std.id === student_id);
    if(student){
        student.enroll_course(course);
        console.log(`${student.name} enrolled in ${course} successfully`);
    }
}
//method to view a student balance
view_student_balance(student_id:number){
    let student = this.find_student(student_id);
    if(student){
        student.view_balance();
}
else{
    console.log("student not found. please enter a correct student iD")

}
}
//method to pay student fees
pay_student_fees(student_id: number, amount:number){
    let student = this.find_student(student_id);
    if(student){
student.pay_fees(amount);
    }
    else{
        console.log("student not found. please enter a correct student ID")
    }
}


//method to display student status
show_student_status(student_id: number){
    let student = this.find_student(student_id);
    if(student){
student.show_status();
    }
}
//method to find a student by student_id
find_student(student_id: number){
    return this.students.find(std => std.id === student_id);
}
}

//main function to run the program
async function main() {
    console.log("wellcome to student Management system");
    console.log("-".repeat(50));
    let student_manager = new Student_manager();

//while loop to keep program running
while(true){
    let choice = await inquirer.prompt([
        {
            name: "choice",
            type:  "list",
           message: "select an option",
           choices:[
            "add student",
            "enroll student",
            "view student balance",
            "pay fees",
            "show status",
            "Exit"
           ]
        }
    ]);
//using switch case to handle for user choice
switch(choice.choice){
    case "add student":
    let name_input =await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter a student Name",
        }
    ]);
    student_manager.add_student(name_input.name);
    break;
    case "enroll student":
        let course_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: "Enter a student ID",
            },
            {
                name: "course",
                 type: "input",
                 message: "Enter a course name",
            },    
            
        ]);

student_manager.enroll_student(course_input.student_id, course_input.course);
break;
case "veiw student balance":
    let balance_input = await inquirer.prompt([
        { 
            name: "student_id",
            type: "number",
            message: "Enter a student ID",
        }
    ]);

student_manager.view_student_balance(balance_input.student_id);
break;
case "pay fees":
    let fees_input = await inquirer.prompt([
        {
            name:"student_id",
            type:"number",
            message:"Enter a student id",
        },
        {
            name:"amount",
            type:"number",
            message:"Enter the amount to  pay",
        }
    ]);
    student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
break;
case "show status":
    let status_input = await inquirer.prompt([
        {
            name:"student_id",
            type:"number",
            message:"Enter a student id",
        },
    ]);
    student_manager.show_student_status(status_input.student_id);
break;
case "exit":
console.log("Exiting.....");
process.exit();

}
}
}

//call function
main();