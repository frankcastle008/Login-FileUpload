const express = require("express")

const {UserFileData,getUserByUserId,deleteFile,checkpin} = require("../db/db")
// let fileUploads = "";
const path = require("path")

const fileUpload=(req,res,next)=>{
console.log(req.headers.pin,req.params);
  let fileUploads = (`https://login-system-with-mongo-adityadixit12.julyseptoct-node.repl.co/${req.files.file.path.split("uploads/")[1]}`);
  
    UserFileData(req.params.id,req.headers.pin,fileUploads).then(data=>{
      res.json({
        message:"File Upload Success"
    }) 
    }).catch(err=>{
      next(err);
    })
  
}

const GetUploads=(req,res,next)=>{
  
      getUserByUserId(req.params.id).then(data=>{
        res.json({
        message: "files",
        data: data.files
    })
      }).catch(err=>{
        next(err)
      })

    

}
const download=(req,res,next)=>{
      const fileName = req.headers.file;
      res.sendFile(`${path.join(__dirname,"../uploads",fileName)}`);

    

}
const delFile = (req,res,next)=>{
  
  deleteFile(req.params.id,req.headers.file).then(data=>{
    res.json({
      message: "file deleted",
      data: data.files
    })
  }).catch(err=>{
    next(err)
  })
}

const pinCheck = (req,res,next)=>{
  console.log(req.headers.pin,req.params)
  checkpin(req.params.id,req.headers.pin).then(data=>{
    res.json({
      message: true
    })
  }).catch(err=>{
    next(err);
  })
}



module.exports= {
    fileUpload,
    GetUploads,
  download,
  delFile,
  pinCheck
}


