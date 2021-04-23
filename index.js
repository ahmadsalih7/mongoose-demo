const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
.then(()=> console.log('Connected to mongodb....'))
.catch(err=> console.log(err.message));

//create schema 
var enu = {
    values: ['frontend', 'backend'],
    message: function(){return `The valid inputs are ${enu.values}`}
}
const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLenght: 3
    },
    author: String,
    tags: {
        type: Array,
        validate:{
            validator: function(v){
                return v && v.length>0;

            },
            message: "A course must have at least one tag"
        }
    },
    date: {type:Date, default:Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){return this.isPublished;},
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
    category: {
        type: String,
        required: true,
        enum: enu
    }
});

const Course = mongoose.model('Course',courseSchema);
//Create model Class
async function createDocument(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['backend'],
        isPublished: true,
        price: 20.8,
        category: 'backend'
        });
    try{
        const result = await course.save();
        console.log(result);
    }
    catch(err){
        for (field in err.errors)
        console.log(err.errors[field]);
    }
}
async function getCourses(){
    const courses = await Course.update()
    find()
    .find({author:'Mosh', isPublished:true})
    .sort({name:1})
    .select({name:1, tags:1});
    console.log(courses);
}

async function updateCourse(id){
    const course = await Course.findById(id);
    if (!course) return;
    course.set({
        isPublished:true,
        author: 'Ahmed Mimo'
    });
    const result = await course.save();
    console.log(result);
}

async function updateCourseFirst(id){
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author: 'Salah',
            isPublished: false
        }
    }, {new: true});
    console.log(course);
}
createDocument();