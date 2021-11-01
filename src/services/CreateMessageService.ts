import prismaClient from '../prisma'

import { io } from '../app'

class CreateMessageService {
    async execute(text: string, userId: string) {
        const message = await prismaClient.message.create({
            data: {
                text,
                userId
            },
            include: {
                user: true
            }
        })

        const infoWS = {
            id: message.id,
            text: message.text,
            userId: message.userId,
            created_at: message.created_at,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url
            }
        }

        io.emit('new_message', infoWS)

        return message
    }
}

export { CreateMessageService }
