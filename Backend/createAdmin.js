import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"   // use "bcrypt" if that is what your userController imports
import userModel from "./models/userModel.js"

const [email, password] = process.argv.slice(2)

if (!email || !password || password.length < 8) {
    console.log("Usage: node createAdmin.js <email> <password (min 8 chars)>")
    process.exit(1)
}

await mongoose.connect(process.env.MONGO_DBurl)
const hash = await bcrypt.hash(password, 10)

const existing = await userModel.findOne({ email })
if (existing) {
    existing.role = "admin"
    existing.password = hash
    await existing.save()
    console.log("Existing user updated to admin")
} else {
    await userModel.create({ name: "Admin", email, password: hash, role: "admin" })
    console.log("Admin created")
}

await mongoose.disconnect()