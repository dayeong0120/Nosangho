import { prisma } from "../db.config.js"


//캔버스 생성 
export const addCanvas = async (data) => {

    //타임존 관련 (추후수정)
    // //현재 날짜 가져오기 (어떤 시간대든 상관없이 한국시간으로 표시하기)
    const now = new Date() //현재시간(UTC기준)
    // const UTC = now.getTime() + (curr.getTimezoneOffset() * 60 * 1000) //now를 UTC로 환산하기 (밀리초 기준)
    // // getTimeZoneOffset : UTC시간까지의 차이를 '분'단위로 리턴

    // const KR_TIME_DIFF = 9*60*60*1000 //한국시간은 UTC +9시간. 9시간을 밀리초로 환산
    // const nowKST = 

    //현재 달과 같은 달의 캔버스가 이미 존재하는 지 확인 
    const nowMonth = now.getMonth()
    const nowYear = now.getFullYear()

    const check = await prisma.canvas.findFirst({
        where: {
            userId: data.userId,
            createdAt: {
                gte: new Date(nowYear, nowMonth, 1), //시작날짜 
                lt: new Date(nowYear, nowMonth + 1, 1) //종료날짜 (다음달 1일 00시 00분 00초)
            }
        }
    })

    if (check) return null


    console.log(now)

    const created = await prisma.canvas.create({
        data: {
            title: data.title,
            userId: data.userId
        }
    })

    return created.id
}

//캔버스 id로 캔버스 조회 
export const getCanvasById = async (canvasId) => {
    const canvas = prisma.canvas.findFirstOrThrow({ where: { id: canvasId } })

    return canvas
}