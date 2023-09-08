import express from "express"
import morgan from "morgan";
import path from "path";

export const app = express();
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded()); //middleware
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));



// Initialize users as an empty array
//let users:User[]= [];

function ispisi () {
  console.log(users)
}


let users: { email: string; password: string }[] = [];

type User = {
    email: string;
    password: string;
  };



app.get("/", (req, res)=>{
  
    res.render(`home.ejs`);
})

app.get("/login", (req, res)=>{
    res.render("login.ejs")
})

app.post('/login', (req, res) => {
  //const { email, password } = req.body;

  const email = req.body.mail;
  const pass = req.body.pass;


  // Check if there is a user with the provided email and password
  const loginUser = users.find(
    (user) => user.email === email && user.password === pass
  );

  if (loginUser) {
    // User is logged in
    res.redirect('/'); // Redirect to a logged-in page
  } else {
    // User is not logged in
    res.redirect('/login'); // Redirect back to the login page with an error message, if desired
  }
});

app.get("/register", (req, res)=>{
    res.render("register.ejs")
})

app.post('/register', (req, res) => {
  //const { email, password } = req.body;

  const newUser: User = {
    email: req.body.mail,
    password: req.body.pass,
  };
  // Check if the user already exists based on their email
  
    // User does not exist, so add them to the users array
    users.push(newUser);
    console.log(JSON.stringify(users)); 
    res.redirect('/login'); // Redirect to the login page after successful registration
  
});

