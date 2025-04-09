const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// EJS 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// data for projects and blog posts
const projects = [
  {
    id: 1,
    title: "Health Care Management System",
    description: "A simple web-based, responsive website 'Health Care Management System' built using HTML, CSS, JavaScript, Node.js, and Express.js. The system allows management of patients, employees, appointments, medical records, and health tips. Data is stored and retrieved using a structured data.json file, enabling easy access and updates.",
    image: "/images/HCMS.png",
    link: "https://github.com/yuwaddylwin/HealthCare-System"
  },
  {
    id: 2,
    title: "Student Management System",
    description: "Python Project manages student records using a CSV file. It allows you to display all students, add new entries, search for specific students, update existing records, delete unwanted entries, and exit the program seamlessly.",
    image: "/images/Python_project.png",
    link: "https://github.com/yuwaddylwin/Assignment/tree/fa70483ef4110149fb56dda8bfe2f0de0581e9ec/tem"
  },
  {
    id: 3,
    title: "Online Shopping Database",
    description: "Designed and developed an Online Shopping Database in Microsoft Access, featuring fully integrated modules for customers, products, orders, payments, and shipping.",
    image: "/images/Database Project.png",
    link: "https://github.com/yuwaddylwin/Assignment/tree/6fdfa3eacf6cca144bca46a2030024e38dd2c5c9/Database"
  },
  {
    id: 4,
    title: "Food Delivery System with Data Structures & Algorithms",
    description: "Developed a Food Delivery Management System using Binary Search Tree (BST) for efficient order management. The system allows adding, finding, updating, and canceling orders, supports online payments, and provides a smooth user experience with an intuitive exit feature.",
    image: "/images/Data Structure & Algorithms Project.png",
    link: "https://github.com/yuwaddylwin/Assignment/blob/0d012dd9afc6290fbfc91f30ff91b95b2b4bc3a0/FoodDelivery.py"
  }
];

const blogPosts = [
  {
    id: 1,
    title: "Starting with Python",
    content: "I began my programming journey with Harvard's CS50 Python course. It was challenging but rewarding, teaching me the fundamentals of programming and problem-solving.",
    date: "January 2022"
  },
  {
    id: 2,
    title: "Discovering Databases",
    content: "Learning about databases opened my eyes to how data is organized and managed in applications. I created my first relational database project for an online shopping system.",
    date: "June 2022"
  },
  {
    id: 3,
    title: "Diving into Web Development",
    content: "Currently exploring HTML, CSS, JavaScript, and Node.js. Building this portfolio website is my first step into full-stack development!",
    date: "April 2023"
  }
];
const messages = [];

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/projects', (req, res) => {
  res.render('projects', { projects });
});

app.get('/blog', (req, res) => {
  res.render('blog', { blogPosts });
});

app.get('/contact', (req, res) => {
  res.render('contact', { message: null });
});

app.post('/contact', (req, res) => {
  const {name, email, message} = req.body;
  const newMessage = {name, email, message, date: new Date()};
  messages.push(newMessage);
  console.log("All messages:", {name, email, message}); 
  
  res.render('contact', { 
      message: "Thank you for your message! I'll get back to you soon.",
      
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});