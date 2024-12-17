

export const bodyToCanvas = (userId, body) => {

    const result = {}
    result.userId = userId

    if (body.title !== undefined) result.title = body.title



    return result
}

export const responseFromCanvas = (data) => {
    return data //수정
}