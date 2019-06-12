const Post = require('../models/Post')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

module.exports = {
    async index(req, res){
        const posts = await Post.find().sort('-createdAt')

        return res.json(posts)
    },
    async store(req, res){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file
        
        const [name] = image.split('.');
        const filename = `${name}.jpg`;
        
        try {
            await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', filename) 
            )
    
            fs.unlinkSync(req.file.path)
            const post = await Post.create({ 
                author, 
                place, 
                description, 
                hashtags, 
                image: filename
            })

            req.io.emit('post', post)
            
            return res.json( post )
        } catch (e) {
            
            return res.json('err')
        }

     
    }
}