const User = require("../models/user");

exports.getUsers = (req , res) => {
    User.find().sort({createdAt: -1})
    .then(result => {
        res.render("../views/userViews/users" , {title: "users", users: result})
    })
    .catch(err => {
        console.log(err)
    });
};
//--------------------------------------------------------------------
exports.createUser = (req,res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save()
    .then(result => {
        res.redirect("/users");
    })
    .catch(err => {
        console.log(err);
    })
};
//--------------------------------------------------------------------
exports.redirectCreateUser = (req,res) => {
    res.render("../views/userViews/createUser" , {title: "Create new user"} );
};

//--------------------------------------------------------------------
exports.getUser =  (req , res) => {
    const id = req.params.id;
    User.findById(id)
    .then(result => {
        res.render("../views/userViews/userDetails" , {title: "User Details" , user: result});
    })
    .catch(err => {
        console.log(err);
    })
};
//--------------------------------------------------------------------
exports.redirectUpdateUser = (req,res) => {
    const id = req.params.id;
    User.findById(id)
    .then(result => {
        res.render("../views/userViews/updateUser" , {title: "User Update" , user: result});
    })
    .catch(err => {
        console.log(err);
    })
};
//--------------------------------------------------------------------
exports.updateUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id , req.body , {new:true})
      .then(result => {
        res.redirect("/users");
      })
      .catch(err => {
        console.log(err);
      });
  };
//--------------------------------------------------------------------
exports.deleteUser =  (req, res) => {
        const id = req.params.id;
        User.findByIdAndDelete(id)
          .then(result => {
            res.redirect("/users");
          })
          .catch(err => {
            console.log(err);
          });
      };
// app.delete('/users/:id', (req, res) => {
//     const id = req.params.id;
//     console.log(req);
//     User.findByIdAndDelete(id)
//       .then(result => {
//         res.json({ redirect: '/users' });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });