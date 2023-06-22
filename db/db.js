const User = require("./schemas/schemas");
const { v4: uuidv4 } = require("uuid");

const createUser = (userdata)=>{
  return new Promise((res,rej)=>{
    User.findOne({username:userdata.username}).then(data=>{
      if(data){
            rej("UserName Already exists");
        }else{

            const user=new User(userdata);
            user.id = uuidv4();
          // console.log(user);
           res( user.save() )
        }
    }).catch(err=>{
         rej(err);
    })
})

}

const getUserByUsername = (username)=>{
  return User.findOne({username: username});
}
const getUserByUserId = (id)=>{
  return User.findOne({id:id});
}

const UserFileData = (id,PIN,path)=>{
  return new Promise((res,rej)=>{User.findOne({id:id}).then(data=>{
    if(data.PIN.toString()===PIN){
      let newFile = [...data.files,path];
    data.files = newFile;
    User.updateOne({id:id},{$set: {...data}})
    // console.log(data,path);
    res(data.save());
    }else{
      rej("Invalid PIN")
    }
    
  }).catch(err=>{
    console.log(err);
    rej(err);
  })
})
}   

const checkpin = (id,pin)=>{
  return new Promise((res,rej)=>{
    User.findOne({id:id}).then(data=>{
      if(data.PIN.toString()===pin){
        res(true);
      }else{
        rej("Invalid PIN")
      }
    }).catch(err=>{
      console.log(err);
      rej(err);
    })
  })
}

const deleteFile = (id,file)=>{
  return new Promise((res,rej)=>{
    User.findOne({id:id}).then(data=>{
      
      let newdata = data.files.filter(ele=>ele!==file)
      
      data.files = newdata ;
      User.updateOne({id:id},{$set: {...data}})
      res(data.save());
    }).catch(err=>{
      rej(err);
    })
  })
}






module.exports = {
  createUser,
  getUserByUsername,
  UserFileData,
  getUserByUserId,
  deleteFile,
  checkpin
}
