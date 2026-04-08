import User from "../models/userModel.js"
import Post from "../models/postModel.js"
import Report from "../models/reportModel.js"

const getAllUsers = async (req, res) => {

    const users = await User.find()

    if (!users) {
        res.status(404)
        throw new Error("Users Not Found!")
    }

    res.status(200).json(users)

}

const getAllPosts = async (req, res) => {
    const posts = await Post.find()

    if (!posts) {
        res.status(404)
        throw new Error("Posts Not Found!")
    }

    res.status(200).json(posts)


}

const updatePost = async (req, res) => {
    let postId = req.params.pid

    const post = await Post.findById(postId)

    if (!post) {
        res.status(404)
        throw new Error('Post Not Found!')
    }

    let updatedPost = await Post.findByIdAndUpdate(postId, { isPublished: post.isPublished ? false : true }, { new: true })

    if (!updatedPost) {
        res.status(409)
        throw new Error('Post Not Updated!')
    }

    res.status(200).json(updatedPost)
}

const getReports = async (req, res) => {
    const reports = await Report.find().populate('user').populate('post')

    if (!reports) {
        res.status(404)
        throw new Error("Reports Not Found!")
    }

    res.status(200).json(reports)
}

const updateUser = async (req, res) => {
    let userId = req.params.uid
    const { credits } = req.body

    const user = await User.findById(userId)

    if (!user) {
        res.status(404)
        throw new Error('User Not Found!')
    }

    let updateData = {}

    // If credits are provided in body, add them to current balance
    if (credits !== undefined) {
        updateData.credits = user.credits + Number(credits)
    } else {
        // Toggle isActive if no credits provided (Backward compatibility for ban functionality)
        updateData.isActive = !user.isActive
    }

    let updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true })

    if (!updatedUser) {
        res.status(409)
        throw new Error('User Not Updated!')
    }

    res.status(200).json(updatedUser)
}


const adminController = { getAllPosts, getAllUsers, getReports, updatePost, updateUser }

export default adminController