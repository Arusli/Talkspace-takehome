import { useState, useEffect, useReducer } from "react";
import { createAvatarListFromStorage } from "./Hooks";
import { generateKey, defaultRobot, buildURL } from "./Services";
import { AvatarList } from './Types'

const useAvatarState = () => {
  const [avatarOptions, setAvatarOptions] = useState(defaultRobot);
  const [avatarList, setAvatarList] = useState<AvatarList>([]);
  console.log(window.localStorage);

  // currently we setAvatar list from local storage on mount
  // On mount, set avatar list from local storage
  useEffect(() => {
    setAvatarList(createAvatarListFromStorage());
  }, []);

  // decouple avatar list from local storage
  // If avatar list changes, update local storage with new avatar list
  useEffect(() => {
    // window.localStorage.clear(); // caused state update issues on refresh app
    avatarList.forEach( (item) => {
        const obj = {
            URL: item.URL,
            name: item.name
        }
        window.localStorage.setItem(item.key, JSON.stringify(obj))
    })
    setAvatarOptions(defaultRobot);
  }, [avatarList])

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const _O = { ...avatarOptions };
    // _O.name = event?.target.value;
    setAvatarOptions((prevOptions) => {
      return { ...prevOptions, name: event.target.value };
    });
  };

  // currently we update local storage, then set new avatar list based on that
  // now we will set new avatar list, and update local storage
  const saveAvatar = (url: string, name: string) => {
    // new version
    setAvatarList(prev => {
        const newItem = {
            key: generateKey(avatarOptions?.name),
            name: avatarOptions?.name,
            URL: buildURL(avatarOptions),
        }
        return [...prev, newItem]
    })
    // console.log(event?.target);
    // old version
    // try {
    //   console.log("fire!!!");
    //   window.localStorage.setItem(
    //     generateKey(name),
    //     JSON.stringify({ URL: url, name: name })
    //   );
    //   setAvatarList(createAvatarListFromStorage());
    //   setAvatarOptions(defaultRobot);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const deleteAvatar = (keyName: string) => {
    // remove item from avatar list
    const newList = avatarList.filter(obj => {
        return obj.key !== keyName;
    }) 
    setAvatarList(newList);
    try {
        window.localStorage.removeItem(keyName)
    } catch(error) {
        console.log(error)
    }
  }

  return {
    avatarOptions,
    setAvatarOptions,
    avatarList,
    setAvatarList,
    updateName,
    saveAvatar,
    deleteAvatar
  };
};

export default useAvatarState;
