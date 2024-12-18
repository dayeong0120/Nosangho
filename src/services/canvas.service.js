import { addCanvas, getCanvasById } from "../repositories/canvas.repository.js"
import { responseFromCanvas } from "../dtos/canvas.dto.js"
import { ExistMonthCanvasError } from "../error.js"

export const canvasAdd = async (data) => {

    console.log("Received data in canvasAdd:", data)

    const canvasId = await addCanvas(data)

    if (canvasId === null) {
        throw new ExistMonthCanvasError(data)
    }

    const canvas = await getCanvasById(canvasId)

    return responseFromCanvas(canvas)
}