import { useState } from "react";

export default function Testing(){
    const [count, setCount] = useState(0);
    //coconut , banana, apple, other
    const [itemName, setItemName] = useState("coconut");

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-9xl">{count} {itemName}s</h1>

            <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                ()=>{
                    const newCount = count + 1
                    setCount(newCount);
                }
            }>
                Count
            </button> 
            <div className="w-full p-4 flex justify-evenly">
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                    ()=>{
                    setItemName("coconut");
                    }
                }>Coconut</button>
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                    ()=>{
                        setItemName("banana");
                    }
                }>Banana</button>
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                    ()=>{
                        setItemName("apple");
                    }
                }>Apple</button>
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                    ()=>{
                        setItemName("other");
                    }
                }>Other</button>
            </div>
        </div>
    )
}