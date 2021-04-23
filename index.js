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

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date, default:Date.now},
    isPublished: Boolean
});
const Course = mongoose.model('Course',courseSchema);
//Create model Class
async function createDocument(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['Angular', 'frontend'],
        isPublished: true
        });
    const result = await course.save();
    console.log(result);

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
updateCourseFirst('607ed344819b38310421f2f3');