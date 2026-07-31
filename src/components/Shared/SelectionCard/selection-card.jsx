import "./selection-card.css";


export default function SelectionCard({
    theme,
    title,
    subtitle,
    image,
    cardHeight,
    cardLength,


}){
    return(
        <div className="cardContainer"
        style={{
            width:cardLength,
            height:cardHeight,
        }
        }>
            <div className="cardPrint">
                <h4>{title}</h4>
                <p>{subtitle}</p>
            </div>
            

        </div>
    );
}