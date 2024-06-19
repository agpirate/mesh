
const _null = ['',null,undefined,0]

let _isnull = async (_value)=> _null.includes(_value)
let _isempty = async (_value) => !!_value || 'Field is required'

let _isequ = async (_value,_value2)=> _value == _value2
let _isgte = async (_value,bottom)=>((_value >= bottom) || 'Please set value to maximum 60')
let _islte = async (_value,top)=>(_value <= top) || 'Please set value to maximum 60'
let _isbtn = async (_value,bottom,top)=>(_value >= bottom && val <= top) || 'Please set value to maximum 60'

export {_isnull,_isempty,_isequ,_isgte,_islte,_isbtn}