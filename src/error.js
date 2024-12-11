
//회원가입 시 이메일 중복
export class DuplicateUserEmailError extends Error {
    errorCode = "U001"


    constructor(data) {
        const reason = "이미 존재하는 이메일입니다"
        super(reason) //부모클래스의 생성자르 ㄹ호출 
        this.reason = reason
        this.data = data
    }
}