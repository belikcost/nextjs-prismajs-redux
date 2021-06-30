import type {NextApiRequest, NextApiResponse} from 'next'
import {PrismaClient} from '@prisma/client'

type Data = {
    name: string
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()

    async function main() {
        const array = await prisma.arrays.create({
            data: {
                ...req.body
            },
        });
        res.status(200).json(array);
    }

    main()
        .catch(e => {
            throw e
        })
        .finally(async () => {
            await prisma.$disconnect()
        })
}