import { Router } from "express";
import { register } from "../controllers/user.controller";

const router=Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',getProfile)


export default router;