import { useState } from "react"

function PlayerInfo({player, symbol, isActive}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(player)
    const [tempPlayerName, settempPlayerName] = useState(player)

    function setEditState() {
        if (isEditing) {
            setPlayerName(tempPlayerName);
            setIsEditing((editing) => !editing)
        } else {
            setIsEditing((editing) => !editing)
        }
    }
    function handleChange(event) {
        settempPlayerName(event.target.value)
    }
    return(
        <>
            <li className={isActive ? 'active': undefined}>
                <span className="player">
                    {!isEditing && 
                    <>
                        <span className="player-name">{playerName}</span>
                        <span className="player-symbol">{symbol}</span>
                    </>
                    }
                    {
                        isEditing &&
                    <>
                        <input type="text" value={tempPlayerName} onChange={handleChange}></input>
                    </>
                    }

                    <button onClick={setEditState}>
                        {!isEditing ? 'Edit' : 'Save'}
                    </button>
                </span>
            </li>
        </>
    )
}

export default PlayerInfo