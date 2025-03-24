import { useState } from "react";
import { onUpdateAvatarList } from "./Hooks";
import { generateKey, defaultRobot } from "./Services";

const useAvatarState = () => {
  const [avatarOptions, setAvatarOptions] = useState(defaultRobot);
  const [avatarList, setAvatarList] = useState(onUpdateAvatarList());

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const _O = { ...avatarOptions };
    // _O.name = event?.target.value;
    setAvatarOptions((prevOptions) => {
        return {...prevOptions, name: event.target.value}
    });
  };

  const saveAvatar = (url: string, name: string) => {
    // console.log(event?.target);
    try {
      console.log("fire!!!");
      window.localStorage.setItem(
        generateKey(name),
        JSON.stringify({ URL: url, name: name })
      );
      setAvatarList(onUpdateAvatarList());
      setAvatarOptions(defaultRobot);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    avatarOptions,
    setAvatarOptions,
    avatarList,
    setAvatarList,
    updateName,
    saveAvatar,
  };
};

export default useAvatarState;
