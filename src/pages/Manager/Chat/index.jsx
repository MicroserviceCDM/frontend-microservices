import React, { useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'

const DirectChatPage = () => {
	const [username, setUsername] = useState('')

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		return (
			<div>
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}

	return (
		<ChatEngine
			height='100vh'
			userName='eva'
			userSecret='evaloveadam'
			projectID='37112769-19e3-41d6-a240-df7dc02896ab'
			renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
	)
}

export default DirectChatPage;