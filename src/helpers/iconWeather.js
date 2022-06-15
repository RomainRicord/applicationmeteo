export const iconWeather = (icon) => {

    let iconWeather = '';

    console.log("Search icon : "+icon)

    require('../../assets/selection.json').icons.map(item => {    

        if(item.tags.includes(icon)){
            iconWeather = item.tags;
        }

    })

    return iconWeather;

}