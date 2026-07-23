
import LoadingCircle from "./loading-circle";

export default function Loading({

}){
    const dots=[0,1,2,3,4];
    return (
        
        <div className="loading">
            {dots.map((index)=>(
                <LoadingCircle
                key={index}
                style={{animationDelay: `${index *100}ms`}}
                />
            ))}
            {/* Loading Animation */}
        </div>
    );
}