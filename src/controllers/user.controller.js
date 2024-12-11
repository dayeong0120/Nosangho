import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp, userLogin } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {

    console.log('자체 회원가입을 요청했습니다.')

    try {
        const user = await userSignUp(bodyToUser(req.body))

        res.status(StatusCodes.OK).success(user)
    }
    catch (error) {
        next(error)
    }
}

export const handleUserLogin = async (req, res, next) => {
    console.log('자체 로그인을 요청했습니다.')

    try {
        const email = req.body.email
        const password = req.body.password

        const user = await userLogin({ email, password })



        console.log('로그인한 사용자 정보:', user)

        console.log('세션에 저장된 id :', req.session.userId)

        req.session.userId = user.id // 세션에 userId 저장 


        req.session.save(function () { //req.session.save()를 사용하면, 세션 저장이 완료되면서 자동으로 쿠키 값이 클라이언트에게 전송


            res.status(StatusCodes.OK).success(user)
        })
        //req.session.save()는 비동기적으로 동작하므로 await를 사용한다고 해서 세션 저장이 완료되지는 않습니다. 
        // req.session.save()는 콜백 방식으로 동작하는 비동기 함수이기 때문에, await로 기다릴 수 없습니다.
    } catch (error) {
        next(error)
    }
}