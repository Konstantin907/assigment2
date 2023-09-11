import express from "express"
import morgan from "morgan";
import path from "path";
import bcrypt from "bcrypt";
import cookieSession from "cookie-session"


export const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded()); //middleware
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use(cookieSession({
  keys:["key1", "key2"],
  maxAge: 30 * 1000
})
);



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



app.get("/home", (req, res)=>{
  res.render('home.ejs')
})

app.get("/login", (req, res)=>{
    res.render("login.ejs")
})

app.post('/login', async (req, res) => {
  const email = req.body.mail;
  const pass = req.body.pass;

  // Check if there is a user with the provided email
  const loginUser = users.find((user) => user.email === email);

  if (!loginUser) {
    // User is not found
    res.redirect('/login'); // Redirect back to the login page with an error message
   return;
  }

  try {
    if (loginUser.password) {
      const isMatching = await bcrypt.compare(pass, loginUser.password);

      if (isMatching) {
        // User is logged in
        //cookie-session
        if (req.session) {
          req.session.currentUser = loginUser.email;
        }
        res.redirect('/home'); // Redirect to a logged-in page
        
      } 

      else {
        // Password does not match
        res.redirect('/login'); // Redirect back to the login page with an error message
      }
    } 
  } catch (error) {
    res.status(404).send("Internal Server Error");
  }
});


app.get("/register", (req, res)=>{
    res.render("register.ejs")
})

app.post ('/register', async (req, res) => {
  //const { email, password } = req.body;


  const salt = await bcrypt.genSalt(); 
  const hashedPass = await bcrypt.hash(req.body.pass, salt)

  const newUser: User = {
    email: req.body.mail,
    password: hashedPass,
  
  };



  // Check if the user already exists based on their email
  
    // User does not exist, so add them to the users array
    users.push(newUser);
    console.log(JSON.stringify(users)); 
    res.redirect('/login'); // Redirect to the login page after successful registration
  
});

