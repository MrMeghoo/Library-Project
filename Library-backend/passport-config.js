const localStrategy =require('passport-local').Strategy
const bcrypt=require('bcrypt');

function initialize(passport, getUserByEmail, getUserById){
    // Function to authenticate users
    async function authenticateUsers(email, password, done) {
        //attempt to retrieve user by email
        const user = await getUserByEmail(email)
        // if user is not found
        if (user == null) {
          return done(null, false, { message: "No user was found with that email" });
        }
        //if user is found compare password with the stored hash
        try {
            //if password matches call done with the user
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
            //if password does not match call done with false
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
      //tell passport to use the strategy for authentication. specifying email as the usernameField
        passport.use(new localStrategy({usernameField: 'email'}, authenticateUsers))
        // serializeUser determines which data of the user should be stored in the session
        passport.serializeUser((user, done)=>done(null, user.id))
        //deserilizeUser function retrieves the whole user from the session based on id
        passport.deserializeUser((id,done)=>{
            return done(null, getUserById(id))
        })
}
//export the initialize function to be used in other places
module.exports = initialize