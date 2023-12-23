exports.getClientRoute = (req, res, next) =>{
    res.status(200).json({ success: true, data: "You have successfully gained access to this test client route" });
}

exports.getHomePage = (req, res, next) => {
    console.log('Home route activated');
    res.render('home')
}
exports.getAboutPage = (req, res, next) => {
    console.log('About route activated');
    res.render('about')
}
exports.getEventsPage = (req, res, next) => {
    console.log('Events route activated');
    res.render('events')
}
exports.getAlumniPage = (req, res, next) => {
    console.log('Alumni route activated');
    res.render('alumni')
}
exports.getManagerPage = (req, res, next) => {
    console.log('Manager route activated');
    res.render('manager')
}
exports.getAuthPage = (req, res, next) => {
    console.log('Auth route activated');
    res.render('auth');
}