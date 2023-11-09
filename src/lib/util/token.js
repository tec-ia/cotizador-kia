import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import { jwtVerify } from "jose"

const TokenJWT = {

    sing: async (payload) => {
        const token = sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 24,
            }
        )

        const serialized = serialize(
            'loginToken',
            token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24,
                path: '/'
            }
        )

        return serialized
    },

    remove: async () => {
        const serialized = serialize(
            'loginToken',
            null,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 0,
                path: '/'
            }
        )

        return serialized
    },

    is_valid: async (token) => {

        var is_valid = false

        if (token) {
            try {

                await jwtVerify(
                    token,
                    new TextEncoder().encode(process.env.JWT_SECRET),
                )

                is_valid = true

            } catch (error) {
                console.log(error)
            }
        }

        return is_valid
    }

}

export default TokenJWT