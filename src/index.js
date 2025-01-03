import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import session from "express-session"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"
import { prisma } from "./db.config.js"

import { handleUserSignUp, handleUserLogin } from './controllers/user.controller.js'
import { handleAddCanvas } from './controllers/canvas.controller.js'
import schedule from "node-schedule"
import { canvasAdd } from './services/canvas.service.js'
import { getAllUserIds } from './repositories/user.repository.js'

dotenv.config()

const app = express()
const port = process.env.PORT

//공통응답 함수 
app.use((req, res, next) => {
    res.success = (success) => {
        return res.json({ resultType: "SUCCESS", error: null, success });
    };

    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
        return res.json({
            resultType: "FAIL",
            error: { errorCode, reason, data },
            success: null,
        });
    };

    next()
})



app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(session({
    cookie: { //세션 ID 쿠키의 옵션을 지정하는 객체
        maxAge: 7 * 24 * 60 * 1000, //ms
    },
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitalized: false,
    store: new PrismaSessionStore(prisma, { // 세션 데이터의 저장 메커니즘
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined
    })
}))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/users/signup", handleUserSignUp)//자체 회원가입 API
app.post("/users/login", handleUserLogin) //자체 로그인 API
app.post("/users/:userId/canvases", handleAddCanvas)//캔버스 생성 

const createCanvasEveryMonth = schedule.scheduleJob('00 00 00 1 * *', async () => {
    console.log('node-schedule 실행')

    const userIds = await getAllUserIds()

    userIds.forEach(userId => {
        canvasAdd({ userId })
    })

    //데이터베이스 내 모든 유저의 캔버스 생성 

    //이미 존재하는 달의 캔버스면 에러뜨는데 그게 문제가 되려나 
})


//전역 오류 처리 미들웨어 
app.use((err, req, res, next) => {
    console.log('전역오류처리미들웨어')
    if (res.headersSent) { //응답 헤더가 이미 전송되었으면 
        return next(err);
    }
    res.status(err.statusCode || 500).error({
        errorCode: err.errorCode || "unknown",
        reason: err.reason || err.message || null,
        data: err.data || null,
    });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})