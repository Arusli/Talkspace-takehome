import './styles/App.css'
import AvatarPreview from './components/AvatarPreview'
import OptionsPicker from './components/OptionsPicker'
import ColorPicker from './components/UI/ColorPicker'
import TextInput from './components/UI/TextInput'
import { AvatarContext, AvatarListContext } from './context'
import { buildURL } from './Services'
import RobotListItem from './components/RobotListItem'
import SaveButton from './components/UI/SaveButton'
import useAvatarState from './useAvatarState'

// issue here is that if I contain these states inside the context provider
// but these handlerfunctions need the state.
// so i can move the handler functions into the providers also
// but the handler functions need access to both states, not separate
function App() {

  const {avatarOptions, setAvatarOptions, avatarList, setAvatarList, updateName, saveAvatar} = useAvatarState();

  return (
    <div className="app_container">
      <AvatarContext.Provider value = {{avatarOptions, setAvatarOptions}}>
          <AvatarListContext.Provider value = {{avatarList, setAvatarList}}>

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
                  { avatarList && avatarList.map((avatar) => {
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
