
 const imgLightIcon = (id) =>(
    <img
    src= {`/icons/light/${id}.svg`}
    width= "50"
    height="50"
    alt={`${id} lighticon`}
    style={{display:"block"}}/>
 );

  const imgDarkIcon = (id) =>(
    <img
    src= {`/icons/dark/${id}.svg`}
    width= "50"
    height="50"
    alt={`${id} dark icon`}
    style={{display:"block"}}/>
 );
 export const Icons={
    calculator: imgLightIcon("calculator"),
    profile: imgLightIcon("profile"),
    start:imgLightIcon("start"),
    weather: imgLightIcon("weather"),
    theme : imgLightIcon("theme"),
    // Dark Versions
    calculator_dark: imgDarkIcon("calculator"),
    profile_dark: imgDarkIcon("profile"),
    start_dark:imgDarkIcon("start"),
    weather_dark: imgDarkIcon("weather"),
    theme_dark : imgDarkIcon("theme"),
 }