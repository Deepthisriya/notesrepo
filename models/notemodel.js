const mongoose =require('mongoose')

const noteSchema = mongoose.Schema({
    title:{
        type:String
    },
    comment:{
        type :String
    }
},
{timeStamps:true}

)


const notes= mongoose.model('noteSchema',noteSchema)

module.exports=notes