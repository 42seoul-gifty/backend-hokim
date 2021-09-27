const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Admin } = require("../models");
const cryptoHash = require("./cryptoHash");

passport.use(
  new LocalStrategy(
    {
      // local 전략을 세움
      usernameField: "id",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, id, password, done) => {
      const admin = await Admin.findOne({
        where: { id, password: cryptoHash(password) },
        attributes: { exclude: ["password"] },
      });

      if (!admin)
        return done(null, false, {
          message: "일치하는 아이디/패스워드가 없습니다",
        }); // 임의 에러 처리

      return done(null, admin.dataValues);
    }
  )
);
passport.serializeUser((user, done) => {
  // Strategy 성공 시 호출됨
  done(null, user.id); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser((id, done) => {
  Admin.findOne({
    where: { id },
    attributes: { exclude: ["password"] },
  }).then((res) => {
    done(null, res.dataValues);
  });
  // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  // 여기의 user가 req.user가 됨
});

module.exports = passport;
