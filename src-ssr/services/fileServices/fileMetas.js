

import multer from "multer";
//import path from "path";
import fs from "fs";

 export async function _filesMeta(files){
    let filesMeta ={}
     for(let filelabel in files){   //[{'filename':'....',},{'filename2':'....',}]
       filesMeta[filelabel]=[]
       filesMeta[filelabel+"Meta"]=[]   
       var filelist = files[filelabel]
       for(let fileIndex in filelist)//{'filename':'....',}
       {   
       try{
         var file = filelist[fileIndex]
         var _thefilePath = "/"+file.fieldname+"/"+file.filename
         var fileMeta = {
            //-----------------------take this only for file(single type)
           //mimetype:file.mimetype,
           //originalname:file.originalname,
           //destination:file.destination,
           //fieldname:file.fieldname,
           //filename:file.filename,
           //path:file.path,
           //----------
           thefilePath:_thefilePath,
           //localPath: encode_localPath,
           geoLocation:"0000000000xyz"
         };
         
         filesMeta[filelabel][fileIndex]=fileMeta.thefilePath
         filesMeta[filelabel+"Meta"][fileIndex]=fileMeta

       }catch{ return false      }
     } }
     return filesMeta
   }

export async function _fileMeta(file){
     let filesMeta ={}
     //filesMeta._thefilePath = "/"+file.fieldname+"/"+file.filename
     var fileMeta = {
        //-----------------------take this only for file(single type)
       //mimetype:file.mimetype,
       //originalname:file.originalname,
       //destination:file.destination,
       //fieldname:file.fieldname,
       //filename:file.filename,
       //path:file.path,
       //----------
       thefilePath:"/"+file.fieldname+"/"+file.filename,
       //localPath: encode_localPath,
       geoLocation:"0000000000xyz"
     };
     filesMeta[file.fieldname]=fileMeta.thefilePath
     filesMeta[file.fieldname+'Meta']=fileMeta
     // 
     return filesMeta
   }



