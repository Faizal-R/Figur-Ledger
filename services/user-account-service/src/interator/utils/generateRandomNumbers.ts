export const generateNumbers=(length:number)=>{
    let numbers="";
    for(let i=0;i<length;i++){
    numbers+=Math.floor(Math.random()*10);
    
    }
    return numbers
}