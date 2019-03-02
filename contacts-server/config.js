exports.port = 5001
exports.origin = process.env.ORIGIN || `http://192.168.10.24:${exports.port}` || `http://localhost:${exports.port}`
