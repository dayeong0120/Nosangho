import { addUser, getUser } from "../repositories/user.repository.js"
import { responseFromUser } from "../dtos/user.dto.js"

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