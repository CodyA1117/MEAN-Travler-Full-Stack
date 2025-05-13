const index = (req, res) => {
    res.render('index', {
        title: 'Express',
        message: 'Hello World'
    });
    }