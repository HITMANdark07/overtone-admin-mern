const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const mongoose    = require('mongoose');
const Admin        = mongoose.model('admin');
const User        = mongoose.model('users');
const keys        = require('../config/keys');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey    = keys.secretOrKey;


module.exports = passport => {
      passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
        console.log("data",jwt_payload.userType);
        //to check admin payload   
            if(jwt_payload.userType ==='admin'){
                  Admin.findById(jwt_payload.id)
                  .then(admin=>{
                          if(admin){
                              return done(null,admin);
                          }
                          return done(null,false);
                  })
                  .catch(err=>console.log(err));
            } 
            if(jwt_payload.userType ==='user'){
              
                User.findById(jwt_payload.id)
                .then(agent=>{
                    console.log("data",jwt_payload);
                        if(agent){
                            return done(null,agent);
                        }
                        return done(null,false);
                })
                .catch(err=>console.log(err));
          }
      })
  );
};