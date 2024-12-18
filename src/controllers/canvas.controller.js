import { StatusCodes } from "http-status-codes"
import { canvasAdd } from "../services/canvas.service.js"
import { bodyToCanvas } from "../dtos/canvas.dto.js"

export const handleAddCanvas = async (req, res, next) => {
    try {

        console.log('캔버스 생성 API를 요청했습니다.')

        const userId = parseInt(req.params.userId)


        const canvas = await canvasAdd(bodyToCanvas(userId, req.body))

        res.status(StatusCodes.OK).success(canvas)
    } catch (error) {
        next(error)
    }
}