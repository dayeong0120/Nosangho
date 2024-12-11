
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

//로그인 시 이메일이나 비밀번호 틀림 
export class NotCorrectUserError extends Error {
    errorCode = "U002"


    constructor(data) {
        const reason = "존재하지 않는 이메일이거나 비밀번호가 맞지 않습니다."
        super(reason)
        this.reason = reason
        this.data = data
    }
}

