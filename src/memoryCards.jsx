import { decode } from "html-entities";
import { useEffect } from "react";

export default function MemoryCards({ data, handleCardClick, matchedCards, selectedCard }) {
useEffect(() => {
  if(data[0]){
       const allCards = document.querySelectorAll(".closed");
        allCards.forEach((card) => card.classList.add("open"));

        // Hide the cards after 2 seconds
        setTimeout(() => {
          allCards.forEach((card) => card.classList.remove("open"));
        }, 2000);
  }
     
      }, [data])
    const emojiCards = data.map((cards, index) => {
      const match = matchedCards.find(card => cards.name == card.name)
      const selected = selectedCard.find(card => index == card.index)

    return (
      <div
        key={index}
        className={match || selected ? "open" : "closed"}
        onClick={() => handleCardClick(cards.name, index)}
      >
        <div className="emoji">
        <div className="card-back">?</div>
          <span>
            {decode(cards.htmlCode[0])}
            </span></div>
      </div>
    );
  });
  return <div className="cards">
        {emojiCards}
    </div>
}
