
export default async function GetUser()
{
    try{
       // return await axios.get("http://localhost:4000/getUser/612fc5d54bbf069c989108b9");

        return await fetch("http://localhost:4000/getUser/612fc5d54bbf069c989108b9");



    }
    catch(e)
    {console.log(e)}
}
