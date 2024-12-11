import dotenv from "dotenv"
import { Strategy as NaverStrategy } from "passport-naver"
import { Strategy as KakaoStrategy } from "passport-kakao"
import { prisma } from "./db.config.js"

dotenv.config()
