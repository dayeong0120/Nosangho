import { prisma } from "../db.config.js"


// 사용자 정보 추가 
export const addUser = async (data) => {
    const check = await prisma.user.findFirst(
        { where: { email: data.email } })

    if (check) return null

    const created = await prisma.user.create({
        data: {
            email: data.email,
            password: data.password,
            name: data.name,
            gender: data.gender,
            birth: data.birth,
            phoneNumber: data.phoneNumber
        }
    })

    return created.id

}


//사용자 정보 얻기 (조회)
export const getUser = async (userId) => {
    const user = await prisma.user.findFirstOrThrow({ where: { id: userId } })
    return user
}

// 로그인 
export const loginUser = async (data) => {
    const user = await prisma.user.findFirst({
        where: {
            email: data.email,
            password: data.password
        }
    })

    if (user === null) return null

    return user
}

//모든 유저의 id값 가져오기
export const getAllUserIds = async () => {
    const users = await prisma.user.findMany({
        select: { id: true }, // id만 선택
    });

    const userIds = users.map(user => user.id)

    return userIds
}