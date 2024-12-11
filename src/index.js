import express from 'express'
import dotenv from "dotenv"
import cors from "cors"

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



app.get('/', (req, res) => {
    res.send('Hello World!')
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