import { Router } from "express";
import User from "../../user";
import UserService from "../../user";
import config from "../config/env"
import { isAdmin, isAuth } from "../../user/middleware"

const user = Router()
user.post("/register", UserService.register)
user.post("/confirm-email", UserService.confirmMail)
user.post("/login", UserService.login)
user.post("/findUser", isAuth, isAdmin, UserService.getAdminTrx)
user.post("/newProject", isAuth, isAdmin, UserService.addNewProject)
user.get("/getProject", UserService.getProjects)




export default user;