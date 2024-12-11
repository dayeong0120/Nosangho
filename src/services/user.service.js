import { addUser, getUser, loginUser } from "../repositories/user.repository.js"
import { responseFromUser } from "../dtos/user.dto.js"
import { DuplicateUserEmailError, NotCorrectUserError } from "../error.js"

export const userSignUp = async (data) => {
    console.log('data:', data)

    const userId = await addUser(data)

    if (userId === null) {
        throw new DuplicateUserEmailError(data)
    }

    const user = await getUser(userId)

    console.log('user:', user)

    return responseFromUser(user)

}

export const userLogin = async (data) => {

    const user = await loginUser(data)

    if (user === null) {
        throw new NotCorrectUserError(data)
    }


    return responseFromUser(user)

}
