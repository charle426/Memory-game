import { useEffect, useState } from "react";
import MemoryCards from "./memoryCards";
import JSConfetti from "js-confetti";

function App() {
  const [emoji, setEmoji] = useState([]);
  const [numMemoryCard, setNumMemoryCard] = useState(10);
  const [selectedCard, setselectedCard] = useState([])
  const [matchedCard, setMatchedCard] = useState([])

  if(emoji[0] && matchedCard.length === emoji.length){
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }
  async function startGame(e) {
    e.preventDefault()
    setMatchedCard([])
    setselectedCard([])

    try {
      const response = await fetch(
        "https://emojihub.yurace.pro/api/all/category/animals-and-nature"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data from API");
      }
      const data = await response.json();
      const dataSlice = getDataSlice(data)
          const emojies = [...dataSlice, ...dataSlice];
          for (let i = emojies.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1));
              let k = emojies[i];
              emojies[i] = emojies[j];
              emojies[j] = k;
          }
        setEmoji(emojies)

    } catch (error) {
      console.error(error);
      // setEmoji(["🍔", "🥙", "🍜", "🧜‍♂️", "🙍‍♂️", "🍔", "🥙", "🍜", "🧜‍♂️", "🙍‍♂️"]);
    }
  }

  function getDataSlice(data) {
    const randomIndices = randomEm(data);

    const dataSlice = randomIndices.reduce((array, index) => {
      array.push(data[index]);
      return array;
    }, []);
    console.log(randomIndices)
    return dataSlice;
  }

  function randomEm(data) {
    let emojiIndex = [];
    for (let i = 0; i < numMemoryCard; i++) {
      let random = Math.floor(Math.random() * data.length);
      if (!emojiIndex.includes(random)) {
        emojiIndex.push(random);
      } else i--;
    }
    console.log(emojiIndex)
    return emojiIndex;
  }

 

  function handleChange(e) {
    e.preventDefault();
    if (e.target.value === "easy") {
      setNumMemoryCard(10);
    } else if (e.target.value === "hard") {
      setNumMemoryCard(20);
    } else if (e.target.value === "difficult") {
      setNumMemoryCard(30);
    } else if (e.target.value === "expert") {
      setNumMemoryCard(40);
    } else console.log(" choose a level");
  }

  function handleCardClick(name, index){
      const findIndex = selectedCard.find(emoji => emoji.index === index)

      if (!findIndex && selectedCard.length < 2){
        setselectedCard(prev => {
         return [
          ...prev,
          {name, index}
        ]
      })
      }else{
        setselectedCard([{name, index}])
      }
  }

  useEffect(() => {
    if(selectedCard.length === 2 && selectedCard[0].name === selectedCard[1].name){
      setMatchedCard(prev => {
       return [
          ...prev, ...selectedCard
        ]
      })
    }
  }, [selectedCard])
  
  
  return (
    <section>
      <div>
        <h1>MEMORY GAME</h1>
        <div>
          {emoji[0] && matchedCard.length === emoji.length ? (
            <div className="wrapper wrapper--accent">
              <p className="p--large">You've matched all the memory cards!</p>
              <button onClick={startGame}>Play again</button>
            </div>
          ) : (
            <div>
              <div className="controls">
                <div className="select-container">
                  <label htmlFor="options">Set Difficulty:</label>
                  <select
                    id="options"
                    name="set-difficulty"
                    className="styled-select"
                    onChange={handleChange}
                  >
                    <option value="easy">Easy</option>
                    <option value="hard">Hard</option>
                    <option value="difficult">Difficult</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <button onClick={startGame}>
                  {emoji[0] ? "Restart" : "Start"}
                </button>
              </div>
              <div className="insturct">
                <p>You can only open two cards at a time</p>
                <div>
                  <h3>
                    {emoji[0] && selectedCard[0]
                      ? `${selectedCard[0].name}`
                      : "_____"}
                  </h3>
                  <h3>
                    {emoji[0] && selectedCard[1]
                      ? `${selectedCard[1].name}`
                      : "_____"}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <MemoryCards
            data={emoji}
            handleCardClick={handleCardClick}
            matchedCards={matchedCard}
            selectedCard={selectedCard}
          />
        </div>
      </div>
    </section>
  );
}

export default App;
