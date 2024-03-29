const express = require('express');
const app = express();
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const {adminKey,userKey,authadminjwt,authuserjwt} = require('./Auth')
app.use(express.json());
const cors=require('cors')
app.use(cors())
const userSchema=new mongoose.Schema({
    id: String,
    pass: String,
    Bcources:[{type:mongoose.Schema.Types.ObjectId,ref:'course'}]
})
const adminSchema=new mongoose.Schema({
    id: String,
    pass: String,
    adminCourse:[{type:mongoose.Schema.Types.ObjectId,ref:'course'}]
})
const courseSchema=new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imgLink:String,
    published:Boolean
})

const user = mongoose.model('user', userSchema);
const admin = mongoose.model('admin', adminSchema);
const course = mongoose.model('course', courseSchema);

mongoose.connect('mongodb+srv://jaiminkhunt:Mukesh2422@cluster0.x3y9vkg.mongodb.net/',{useNewUrlParser:true,useUnifiedTopology:true});


const generatejwt=(id,key)=>
{
    token = jwt.sign({id},key,{ expiresIn: '1h' });
    return token;
}




// Admin routes
app.post('/admin/signup',async (req, res) => {
    let id=req.body.id
    let pass=req.body.pass
    let exist=await admin.findOne({id});
    if(exist) res.status(403).json({ message: 'Admin already exist' });
    else
    {
        const newAdmin = new admin({ id, pass });
        await newAdmin.save();
        let token=generatejwt(id,adminKey)
        res.json({ message: 'Admin created successfully',token });
    }

});

app.post('/admin/login', async(req, res) => {
    let {id,pass}=req.body;
    
    let exist=await admin.findOne({id});
    if(exist)
    {
        if(exist.pass==pass)
        {
            const token =generatejwt(id,adminKey)
            res.json({ message: 'Logged in successfully',token }); 
        }
        else
        {
            res.send("log in failed");
        }
    }
    else{
        res.send("Log In Failed");
    }
});

app.post('/admin/addcourse',authadminjwt, async (req, res) => {
  const crcs =new course(req.body);;

  
  await crcs.save();

  let adm=await admin.findOne({id:req.user.id});
  adm.adminCourse.push(crcs)
    await adm.save();
  
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', authadminjwt,async (req, res) => {
  
    const crs = await course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  
    if(crs){
        res.json({ message: 'Course updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.get('/admin/courses', authadminjwt,async (req, res) => {
    let adm=await admin.findOne({id:req.user.id}).populate('adminCourse')
    if (adm) {
        res.json({ adminCourse: adm.adminCourse || [] });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
});
// me route 
app.get('/admin/me',authadminjwt,(req,res)=>{
    res.json(
        {username:req.user.id}
    )
})

app.get('/get/course/:id',authadminjwt,async(req,res)=>{
    const crs = await course.findById(req.params.id)
    if(crs)
    {
        res.json({crs});
    }
    else
    {
        res.send("course not found");
    }
})

// User routes



app.post('/users/signup',async (req, res) => {
    
    let id=req.body.id;
    let pass=req.body.pass;

    
    let exist=await user.findOne({id});
    if(exist) res.status(403).json({ message: 'User already exist' });
    else
    {
        const newUser=new user({id,pass})
        await newUser.save();
        const token=generatejwt(id,userKey)
        res.json({ message: 'User created successfully' ,token});
    }
});

app.post('/users/login', async(req, res) => {
    let id=req.body.id;
    let pass=req.body.pass;

    
    let exist=await user.findOne({id,pass});
    if(exist)
    {
        const token =generatejwt(id,userKey)
        res.json({ message: 'Logged in successfully',token });
    }
    else{
        res.send("login failed");
    }
});

app.get('/users/courses', authuserjwt,async (req, res) => {
  // logic to list all courses
  const courses = await course.find({});
  res.json({courses});
  
});

app.post('/users/courses/:courseId', authuserjwt,async (req, res) => {
  // logic to purchase a course
    const crs = await course.findById(req.params.courseId);
    if(crs){
        let us=await user.findOne({id:req.user.id})
        if(us)
        {    us.Bcources.push(crs)
            await us.save();
            res.json({ message: 'Course purchased successfully', courseId: course.id });
        }else {
            res.status(403).json({ message: 'User not found' });}
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }

});

app.get('/users/purchasedCourses', authuserjwt,async (req, res) => {
  // logic to view purchased courses
  let us=await user.findOne({id:req.user.id}).populate('Bcources')
  if (us) {
    res.json({ Bcources: us.Bcources || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});
app.get('/user/me',authuserjwt,(req,res)=>{
    res.json(
        {username:req.user.id}
    )
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});