import { useRef,useCallback,useState, useEffect } from "react";
// import { Hero,InputHero,ButtHero } from "./Search.styled";
localStorage.clear()
const Search=()=>{
    const r=useRef(null)
    const [array,changeArray]=useState(localStorage.getItem('array')===null?([]):(JSON.parse(localStorage.getItem('array'))))
    const click=useCallback(async()=>
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${r.current.value}&appid=3ca8038fbb40321d1e03df9a10bbb2c2`)
        .then(resp=>resp.json())
        .then(res=>{changeArray([...array,res])})
        .finally(()=>{localStorage.setItem('array',JSON.stringify(array))})
    ,[array])
    useEffect(()=>{
        const update=async()=>{
            if(array.length>0){
                const newA=[]
                for(const item of array){
                    const newIt=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${item.name}&appid=3ca8038fbb40321d1e03df9a10bbb2c2`)
                    .then(resp=>resp.json())
                    newA.push(newIt)
                }
                changeArray(newA)
            }
        }
        update()
    },[array])
    return(
        <section>
            {/* <HeroDiv> */}
                <h1>Weather dashboard</h1>
                <input ref={r} placeholder='Search location...' type="text"/>
                <button onClick={click}>j</button>
                <ul>{array.map((el,index)=><li key={index}>{el.name}</li>)}</ul>
            {/* </HeroDiv> */}
        </section>
    );
}
export default Search