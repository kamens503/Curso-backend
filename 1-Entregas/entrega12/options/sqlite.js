const options = {
    client: 'sqlite3',
    connection: {
        filename: `${__dirname}/DB/db.sqlite`
    },
    useNullAsDefault: true

}

module.exports = {
    options
}