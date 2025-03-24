import './styles/App.css'
import AvatarPreview from './components/AvatarPreview'
import OptionsPicker from './components/OptionsPicker'
import ColorPicker from './components/UI/ColorPicker'
import TextInput from './components/UI/TextInput'
import { AvatarContext, AvatarListContext } from './context'
import { buildURL, alphabetizeAvatars } from './Services'
import RobotListItem from './components/RobotListItem'
import SaveButton from './components/UI/SaveButton'
import useAvatarState from './useAvatarState'

function App() {

  const {avatarOptions, setAvatarOptions, avatarList, setAvatarList, updateName, saveAvatar, deleteAvatar} = useAvatarState();

  return (
    <div className="app_container">
      <AvatarContext.Provider value = {{avatarOptions, setAvatarOptions}}>
          <AvatarListContext.Provider value = {{avatarList, setAvatarList, deleteAvatar}}>

            <div className="main">
              <div className="avatar_creator">
                <SaveButton
                  disabled={avatarOptions?.name==="" ? true : false} 
                  handleOnClick={() => {saveAvatar(buildURL(avatarOptions), avatarOptions?.name)}}
                >+</SaveButton>

                <AvatarPreview
                />
                <div className="row">
                  <TextInput 
                    label=""
                    value={avatarOptions?.name || "" }
                    name="avatar_name"
                    placeholder="Name Me!" 
                    handleOnChange={updateName}
                  />
                </div>
                <div className="row">
                  <ColorPicker
                    label="Color"
                    defaultColor={`#${avatarOptions?.baseColor}`}
                    optionKey="baseColor"
                  />
                  <ColorPicker
                    label="Background"
                    defaultColor={`#${avatarOptions?.backgroundColor}`}
                    optionKey="backgroundColor"
                  />
                </div>
                <OptionsPicker/>
              </div>
              <div className="avatar_list">
                <ul>
                  { avatarList && alphabetizeAvatars(avatarList).map((avatar) => {
                      return (
                        <RobotListItem
                          key={avatar.key}
                          keyName={avatar.key}
                          name={avatar.name}
                          url={avatar.URL}
                        />
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </AvatarListContext.Provider>  
      </AvatarContext.Provider>
    </div>
  )
}

export default App
