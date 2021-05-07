const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You are in the corridor with three doors in front of you.',
    options: [
      {
        text: 'Enter Room 1',
        nextText: 20
      },
      {
        text: 'Enter Room 2',
        nextText: 30
      },
      {
      	text: 'Enter Room 3',
      	nextText: 40
      }
    ]
  },



  {
    id: 20,
    text: 'You enter Room 1. You see a window and a table',
    options: [
      {
        text: 'Look out the window',
        nextText: 22
      },
      {
        text: 'Check the table',
        nextText: 21
      },
      {
        text: 'Go back to the corridor',
        nextText: 1
      },
      {
        text: 'Guess the country',
        nextText: 7
      }
    ]
  },
  {
    id: 22,
    text: 'You see a huge steel tower. Its night-time so you see bright lights all over it. You also see a warning that taking a picture of it will get you arrested.',
    options: [
      {
        text: 'Take a picture of it. ',
        nextText: 23
      },
      {
        text: 'Note it in your mind and continue looking at Room 1',
        nextText: 20
      },
      {
      	text: 'Go back to the corridor',
      	nextText: 1
      },
      {
      	text: 'Guess the country',
      	nextText: 7
      }
    ]
  },
  {
    id: 23,
    text: 'You just took a picture of Eiffel Tower at night. Its illegal so the police put you in jail, you starve to death and die.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },
  {
    id: 21,
    text: 'You see a dictionary on the table.',
    options: [
      {
        text: 'Pick up the dictionary.',
        setState: { dictionary: true },
        nextText: 20
      },
      {
        text: 'Leave the dictionary.',
        nextText: 20
      }
    ]
  },
  {
    id: 7,
    text: 'You decided to guess the country.',
    options: [
      {
        text: 'Poland',
        nextText: 51
      },
      {
        text: 'England',
        nextText: 51
      },
      {
        text: 'France',
        nextText: 52
      },
    ]
  },
  {
    id: 51,
    text: 'Your guess is incorrect.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 52,
    text: 'Correct! Congratulations on winning the game.',
    options: [
      {
        text: 'Play again',
        nextText: -1
      }
    ]
  },  
  {
    id: 30,
    text: 'Upon opening the door you encounter a strange man with a nametag Benjamin who appears to be waiting for you.',
    options: [
      {
        text: 'Talk to Benjamin',
        nextText: 31
      },
      {
        text: 'Go back to the corridor',
        nextText: 1
      },
      {
        text: 'Guess the country',
        nextText: 7
      }
    ]
  },
  {
    id: 31,
    text: 'Benjamin is talking in a language you do not understand',
    options: [
      {
        text: 'Look up the conversation words in dictionary to understand what Benjamin is talking about',
        requiredState: (currentState) => currentState.dictionary,
        nextText: 32
      },
      {
        text: 'Try to talk to Benjamin without any help resource',
        nextText: 33
      },
      {
        text: 'Go back to the corridor',
        nextText: 1
      },
      {
        text: 'Guess the country',
        nextText: 7
      }
    ]
  },
  {
    id: 32,
    text: 'With the help of a dictionary you decipher that Benjamin is saying "Alexandre Dumas and his book "The Count of Monte Cristo" is the greatest literary achievement of our national literary canon.',
    options: [
      {
        text: 'Thank Benjamin for the conversation and go back to the corridor',
        nextText: 1
      },
      {
        text: 'Guess the country',
        nextText: 7
      }
    ]
  },
  {
    id: 33,
    text: 'You dont understand what Benjamin is talking about. He gets upset at you and kills you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 40,
    text: 'In Room 3 there is no windows, but on the wall there is a painting. The warning on top of it says to not get close to it or you will get killed.',
    options: [
    	{
    		text: 'Examine the painting anyway.',
    		nextText: 41
    	},
    	{
    		text: 'Ignore the paiting and come back to the corridor.',
    		nextText: 1
    	}
    ]
  },
  {
    id: 41,
    text: 'On the paiting there is a cabaret and a red mill above it. A text on top of it says Moulin Rouge.',
    options: [
      {
        text: 'Go back to the corridor',
        nextText: 1
      },
      {
        text: 'Guess the country',
        nextText: 7
      }
    ]
  },
]

startGame()