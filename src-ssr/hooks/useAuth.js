
const jwt = require("jsonwebtoken");

async function _checkToken(_cookie){
  try {
    const decoded = jwt.verify(_cookie, process.env.TOKEN_SECRET);
    console.log(`Token Decoded For = \n`);
    console.log(decoded);
    //---------Embeding Generated_Data && Forwarding
    if (decoded) {
      // _userID = decoded.userID ?? _userID;
      // _issID = decoded["acckey"] ?? _issID;
      return [ decoded.userID ?? null,decoded["acckey"] ?? null]
    } else {
    }
  } catch {
    console.log(`Token Decoded Error = \n`);
  }
  return [null,null]
}

export { _checkToken}
