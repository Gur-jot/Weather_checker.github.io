let loc =document.getElementById("location");
let tempicon =document.getElementById("temp_icon");
let tempvalue =document.getElementById("temp_value");
let climate =document.getElementById("climate");
let iconfile;
const searchInput =document.getElementById("search_input");
const searchButton =document.getElementById("search_button");


// noe this part is for searching city wether . so for this i hv to stop my location pop up
searchButton.addEventListener('click', (e)=>
{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
})



// async does work serially
const getWeather=async(city)=>
// if someone i/p wrong location we ll use this try catch
{
   try{
       const Response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5fc0bfabfe1e805fb3ec4c8e7fe9c4f7`,
        {mode:'cors'});

       
     const weatherData =await Response.json();
     console.log(weatherData);
     const {name} = weatherData;
     const {feels_like}=weatherData.main;
     const{id, main}=weatherData.weather[0];
     loc.textContent=name;
     climate.textContent=main;
     tempvalue.textContent=Math.round(feels_like-273);
     if(id<300 && id>200)
                    {
                        tempicon.src="./icons/storm.png"
                    }
                    else if(id<400 && id>300)
                    {
                        tempicon.src="./icons/cloud.png"
                    }
                   else if(id<600 && id>500)
                    {
                        tempicon.src="./icons/rain.png"
                    }
                    else if(id<700 && id>600)
                    {
                        tempicon.src="./icons/snowman.png"
                    }
                    else if(id<800 && id>700)
                    {
                        tempicon.src="./icons/cloud.png"
                    }
                  else  if(id==800)
                    {
                        tempicon.src="./icons/sunny.png"
                    }

   
    }
    catch(error)
    {
        alert("city not found");
    }
}



















window.addEventListener("load",()=>{
    let long;
    let lat;
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>
        {
            long=position.coords.longitude;
            lat=position.coords.latitude;
            
            const api=` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5fc0bfabfe1e805fb3ec4c8e7fe9c4f7`
            fetch(api).then( (Response)=>{
                return Response.json();
            })

            .then(data =>
                {
                    const{name}=data;
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];

                    loc.textContent=name;
                    climate.textContent=main;
                    tempvalue.textContent=Math.round(feels_like-273);

                    if(id<300 && id>200)
                    {
                        tempicon.src="./icons/storm.png"
                    }
                    else if(id<400 && id>300)
                    {
                        tempicon.src="./icons/cloud.png"
                    }
                   else if(id<600 && id>500)
                    {
                        tempicon.src="./icons/rain.png"
                    }
                    else if(id<700 && id>600)
                    {
                        tempicon.src="./icons/snowman.png"
                    }
                    else if(id<800 && id>700)
                    {
                        tempicon.src="./icons/cloud.png"
                    }
                  else  if(id==800)
                    {
                        tempicon.src="./icons/sunny.png"
                    }
                    console.log(data);
                })

        })
    }
})