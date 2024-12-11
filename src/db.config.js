import dotenv from "dptenv"
import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({ log: ["query"] })

dotenv.config()