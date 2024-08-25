import express from "express";

const app = express();
const port = 3000;
var allBlogs = [];
var blogCount = 0;

app.use(express.urlencoded({extended: true}));

function customlogger (req,res,next) {
    console.log("Method called : "+req.method+" "+req.url);
    next();
  };

app.use(customlogger);

app.get("/",(req,res)=>{
    res.render("index.ejs",{allBlogs, addBlogFlag: false});
});

app.post("/submit",(req,res)=>{
    console.log(req.body);
    
    const blog={
        blogId: blogCount,
        blogTitle: req.body.blogTitle,
        blogContent: req.body.blogContent
    }
    blogCount++;
    allBlogs.push(blog);
    console.log(allBlogs);
    
    res.render("index.ejs",{allBlogs, addBlogFlag: false});
})

app.get("/addBlog",(req,res)=>{
    res.render("index.ejs",{addBlogFlag: true})
})

app.post("/deleteBlog",(req,res)=>{
    console.log(req.body);
    let match = allBlogs.findIndex(blog => blog.blogId == req.body.blogId)
    console.log("Match : "+match);  
    allBlogs.splice(match, 1)
    res.render("index.ejs",{allBlogs, addBlogFlag: false});
})

app.post("/editBlog",(req,res)=>{
    console.log(req.body);
    let match = allBlogs.findIndex(blog => blog.blogId == req.body.blogId)
    console.log("Match : "+match);  
    const editBlog = allBlogs[match]
    res.render("index.ejs",{editBlog, addBlogFlag: false});
})

app.post("/saveBlog",(req,res)=>{
    console.log(req.body);
    let match = allBlogs.findIndex(blog => blog.blogId == req.body.blogId)
    console.log("Match : "+match);  
    allBlogs[match].blogTitle = req.body.blogTitle
    allBlogs[match].blogContent = req.body.blogContent
    res.render("index.ejs",{allBlogs, addBlogFlag: false});

})

app.post("/search",(req,res)=>{
    console.log(req.body);
    const resultBlogs =  allBlogs.filter(blog => blog.blogContent.includes(req.body.search))
    res.render("index.ejs",{resultBlogs, addBlogFlag: false});

})

app.listen(port, ()=>{
    console.log(`Server listening on ${port} `)
});