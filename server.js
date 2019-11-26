const http = require("http");
const app = require("./app");

require("./db");

const server = http.createServer(app);
const PORT = process.env.PORT;

server.listen(PORT ,console.log(`http://localhost:${PORT} 로 서버를 연결합니다.`));