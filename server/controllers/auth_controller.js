exports.login = (req, res) => {
  res.redirect('/analytics');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.currentUser = (req, res) => {
  console.log(req.user);
  res.send(req.user);
};