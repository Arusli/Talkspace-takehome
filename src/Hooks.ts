import { AvatarList } from './Types'
// this is not a hook, rename file/function or move to another
export const createAvatarListFromStorage =  () => {
  try{
    const keys = Object.keys(window.localStorage)
    const aList:AvatarList = [] 
    keys.forEach((key) => {
      let item = window.localStorage.getItem(key) || '{"URL":"undefined", "name": "undefined"}'
      const avatar = JSON.parse(item)
      avatar.key = key
      aList.push(avatar)
    })   
    return aList
  } catch(error) {
    console.log(error)
    return [] // for safety
  }
}