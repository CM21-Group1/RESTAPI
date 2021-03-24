#!/usr/bin/env node
const app = require('../app.js');

app.listen(app.get('port'), () =>
    console.log(`Server running on port ${app.get('port')}`),
)
