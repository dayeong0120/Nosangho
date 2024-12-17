
export const bodyToUser = (body) => {

    const result = {}

    //수정 PATCH 때 재사용하기 위함 
    if (body.email !== undefined) result.email = body.email
    if (body.password !== undefined) result.password = body.password
    if (body.name !== undefined) result.name = body.name
    if (body.gender !== undefined) {
        result.gender = body.gender
    }
    if (body.birth !== undefined) {
        const birth = new Date(body.birth);
        // date로 파싱(형태 바꾸기?)해서 변환 
        result.birth = birth
    }
    if (body.phoneNumber !== undefined) result.phoneNumber = body.phoneNumber

    return result
}

export const responseFromUser = (user) => {
    return {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        gender: user.gender || "",
        birth: user.birth || "",
        phoneNumber: user.phoneNumber,
    }
}
