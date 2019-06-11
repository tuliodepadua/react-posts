const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true
})
.then(() => console.log('Conectado'))
.catch(e => console.log(e))
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    }
},
    {
    timestamps: true,
}
)

module.exports = mongoose.model('Post', PostSchema);