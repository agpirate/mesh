

import multer from "multer";
//import path from "path";
import fs from "fs";

export const getFileOptions = () => {
  var newName =  ""
  return {
    storage: multer.diskStorage({
      filename: (req, file, cb) => {
        let extension = supportedMimes[file.mimetype];
        let _originalName = file.originalname.split(".")[0];
        newName =_originalName.split(" ")[0] + "-" + new Date().getTime() + "." + extension;
        cb(null, newName);
      },
      destination: (req, file, cb) => {cb(null, "./public/"+ file.fieldname)},
      path:        (req, file, cb) => {cb(null, "/"+file.fieldname +"/"+newName)},
    }),
    limits: { fileSize: 1000000 * 5 },
    fileFilter: (req, file, cb) => {
      let extension = supportedMimes[file.mimetype];
      if (!extension) {
        return cb(null, false);
      } else {
        cb(null, true);
      }
    },
  };
};