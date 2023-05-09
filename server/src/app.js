// ====   require here   ====
// 配置
const { sysConfig } = require("./config")
// package
const path = require("path")
const Koa = require("koa")
const Router = require("koa-router")
const KoaBody = require("koa-body")
const koaJwt = require("koa-jwt")
const cors = require("@koa/cors")
const koaStatic = require("koa-static")
const KoaLoger = require("koa-logger")
// 自定义中间件
const errorHandle = require("./middle/error_handler")
const tokenChecker = require("./middle/token_checker")
// 其他
const dbGenerator = require("./db/db_generator")
// ==== code from here ====

// 实例化
const app = new Koa()
const router = new Router()

// 建立数据库连接
dbGenerator()

// log
app.use(KoaLoger())

// 处理跨域
app.use(cors())

// 错误处理
app.use(errorHandle())

// 处理静态资源
const staticPath = "../static"
app.use(koaStatic(path.join(__dirname, staticPath)))

// 解析 Body
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      maxFieldsSize: 2000 * 1024 * 1024
    }
  })
)

// jwt 处理
app.use(
  koaJwt({ secret: sysConfig.tokenSalt }).unless({
    path: [
      /^\/api\/test/,
      /^\/api\/user\/login/,
      /^\/api\/user\/register/,
      /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问
    ]
  })
)

app.use(tokenChecker())

// 创建路由
router.use("/api/user", require("./routes/user_router"))
router.use("/api/building", require("./routes/building_router"))
router.use("/api/floor", require("./routes/floor_router"))
router.use("/api/room", require("./routes/room_router"))
router.use("/api/evaluate", require("./routes/evaluate_router"))
router.use("/api/record", require("./routes/record_router"))
router.use("/api/cleaner", require("./routes/cleaner_router"))
router.use("/api/faculty", require("./routes/faculty_router"))
router.use("/api/visitor", require("./routes/visitor_router"))

app.use(router.routes())

app.listen(sysConfig.port)
console.log(`serve running on: http://localhost:${sysConfig.port}`)
