module.exports.asingCart = (req, res, next) => {
  console.log('middle Cart');
  next()
}

module.exports.auth = (req, res, next) => {
  const methods = req.route.methods

  next()
}