require('dotenv').config()

const prisma = require('./prisma')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}

module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {

    console.log(jwt_payload);

    const user = await prisma.user.findUnique({
      where: {
        userId: jwt_payload.sub
      }
    })

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }));
};

