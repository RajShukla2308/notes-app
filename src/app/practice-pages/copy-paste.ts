

export async function copy(text: any){
    try{
        await navigator.clipboard.writeText(text);
    }catch(error: any){
        console.log('error while copying text', error?.message);
    }
}


export async function paste(){
    try{
        const text = await navigator.clipboard.readText();
        return text;
    }catch(error:any){
        console.log('error while pasting', error.message)
        return null;
    }
}

await copy('hello world');
const text = await paste();
console.log(text); // hello world