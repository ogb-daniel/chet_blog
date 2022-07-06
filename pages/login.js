import React from 'react'
import { COLORS } from "../public/theme";
import {useRouter} from 'next/router'
import Image from "next/image";
import { login } from '../services';
const Login = () => {
    const router = useRouter();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    // const [errorMessage, setErrorMessage] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const submit=async (e)=>{
        e.preventDefault();
        setIsLoading(true)
        if (name) {
            const result = await login(name); 
            if(result.authors.length <= 0){
                // setError(true)
                setError("User does not exist")
                setIsLoading(false)
                return;
            }else if (name.length === 0) {
                setError("Enter a username")
                setIsLoading(false)
                return;
            }
            setError("");
            setIsLoading(false)
            const user = result.authors[0].id;
            window.localStorage.setItem('user',user);
            router.replace('/')
            console.log(result);
        }else{
            setError("Enter a username");
            setIsLoading(false)
            return;
        }
      
   

    }
    return ( 
    <div className="flex items-center h-screen">
    <div className=" max-w-screen-md mx-auto rounded-xl" style={{backgroundColor:COLORS.primary}}>
    <div className="flex py-4 px-6 md:flex-row flex-col">
            <div className="flex-1">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="406" height="306" class="illustration styles_illustrationTablet__1DWOa"><g id="_534_content_creation_outline" data-name="#534_content_creation_outline"><rect x="118.77" y="65.6" width="137.5" height="151.94" fill="#68e1fd"></rect><path d="M256.27,218.55H118.77a1,1,0,0,1-1-1V65.6a1,1,0,0,1,1-1h137.5a1,1,0,0,1,1,1v152A1,1,0,0,1,256.27,218.55Zm-136.5-2h135.5V66.6H119.77Z" fill="#093f68"></path><polygon points="268.83 234.4 135.2 234.4 135.2 100.11 158.92 78.14 268.83 78.14 268.83 234.4" fill="#fff"></polygon><path d="M268.83,235.4H135.2a1,1,0,0,1-1-1V100.11a1,1,0,0,1,.32-.73l23.72-22a1,1,0,0,1,.68-.26H268.83a1,1,0,0,1,1,1V234.4A1,1,0,0,1,268.83,235.4Zm-132.63-2H267.83V79.14H159.31L136.2,100.55Z" fill="#093f68"></path><polygon points="135.2 100.11 158.65 100.11 158.92 78.14 135.2 100.11" fill="#fff"></polygon><path d="M158.65,101.11H135.2a1,1,0,0,1-.68-1.73l23.72-22a1,1,0,0,1,1.68.75l-.27,22A1,1,0,0,1,158.65,101.11Zm-20.9-2h19.91l.23-18.66Z" fill="#093f68"></path><path d="M251,119.3H167.3a1,1,0,0,1,0-2H251a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M221.52,133.21H153.06a1,1,0,0,1,0-2h68.46a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M251,147.12H150.48a1,1,0,0,1,0-2H251a1,1,0,1,1,0,2Z" fill="#dfeaef"></path><path d="M251,161H185.49a1,1,0,0,1,0-2H251a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M175.5,161h-13a1,1,0,0,1,0-2h13a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M251,174.94H221.52a1,1,0,0,1,0-2H251a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M214,174.94h-61a1,1,0,0,1,0-2h61a1,1,0,1,1,0,2Z" fill="#dfeaef"></path><path d="M251,188.85h-15.9a1,1,0,0,1,0-2H251a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M228.22,188.85H205.46a1,1,0,0,1,0-2h22.76a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M197.26,188.85H179.07a1,1,0,0,1,0-2h18.19a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M171.94,188.85H153.06a1,1,0,0,1,0-2h18.88a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M231.15,202.76H167.3a1,1,0,0,1,0-2h63.85a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M243,133.21h-8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M251,97.55H221.52a1,1,0,0,1,0-2H251a1,1,0,0,1,0,2Z" fill="#dfeaef"></path><path d="M220.61,155.84h71.34a0,0,0,0,1,0,0v52.22a3.42,3.42,0,0,1-3.42,3.42H224a3.42,3.42,0,0,1-3.42-3.42V155.84A0,0,0,0,1,220.61,155.84Z" fill="#fff"></path><path d="M288.53,212.48H224a4.43,4.43,0,0,1-4.42-4.42V155.84a1,1,0,0,1,1-1H292a1,1,0,0,1,1,1v52.22A4.43,4.43,0,0,1,288.53,212.48Zm-66.92-55.64v51.22a2.43,2.43,0,0,0,2.42,2.42h64.5a2.43,2.43,0,0,0,2.42-2.42V156.84Z" fill="#093f68"></path><path d="M224,149.62h64.49a3.42,3.42,0,0,1,3.42,3.42v2.8a0,0,0,0,1,0,0H220.61a0,0,0,0,1,0,0V153A3.42,3.42,0,0,1,224,149.62Z" fill="#ffbc0e"></path><path d="M292,156.84H220.61a1,1,0,0,1-1-1V153a4.42,4.42,0,0,1,4.42-4.42h64.5A4.43,4.43,0,0,1,293,153v2.8A1,1,0,0,1,292,156.84Zm-70.34-2H291V153a2.42,2.42,0,0,0-2.42-2.42H224a2.42,2.42,0,0,0-2.42,2.42Z" fill="#093f68"></path><polygon points="245.39 193.37 245.39 164.95 273 179.16 245.39 193.37" fill="#ffbc0e"></polygon><path d="M245.39,194.37a1.07,1.07,0,0,1-.52-.14,1,1,0,0,1-.48-.86V165a1,1,0,0,1,1.45-.89l27.62,14.21a1,1,0,0,1,.54.89,1,1,0,0,1-.54.89l-27.62,14.21A1,1,0,0,1,245.39,194.37Zm1-27.78v25.14l24.42-12.57Z" fill="#093f68"></path><path d="M282.86,203.85H229.7a1,1,0,0,1,0-2h53.16a1,1,0,0,1,0,2Z" fill="#093f68"></path><circle cx="271.27" cy="202.85" r="3.12" fill="#093f68"></circle><path d="M271.27,207a4.12,4.12,0,1,1,4.12-4.12A4.13,4.13,0,0,1,271.27,207Zm0-6.24a2.12,2.12,0,1,0,2.12,2.12A2.12,2.12,0,0,0,271.27,200.73Z" fill="#093f68"></path><rect x="242.07" y="93.36" width="58.4" height="43.51" fill="#70cc40"></rect><path d="M300.47,137.88h-58.4a1,1,0,0,1-1-1V93.36a1,1,0,0,1,1-1h58.4a1,1,0,0,1,1,1v43.52A1,1,0,0,1,300.47,137.88Zm-57.4-2h56.4V94.36h-56.4Z" fill="#093f68"></path><path d="M242.07,125.68a1,1,0,0,1-.83-.44,1,1,0,0,1,.27-1.39l27.1-18.19a1,1,0,0,1,1.18,0l21.36,17.06a1,1,0,0,1,.15,1.4,1,1,0,0,1-1.4.16l-20.79-16.6-26.48,17.78A1,1,0,0,1,242.07,125.68Z" fill="#093f68"></path><path d="M300.47,118.16a1,1,0,0,1-.62-.21l-9.26-7.25-7.37,7.18a1,1,0,0,1-1.39-1.44l8-7.79a1,1,0,0,1,1.31-.07l9.95,7.79a1,1,0,0,1-.62,1.79Z" fill="#093f68"></path><circle cx="281.75" cy="103.71" r="4.24" fill="#f56132"></circle><path d="M281.75,108.94a5.24,5.24,0,1,1,5.23-5.23A5.24,5.24,0,0,1,281.75,108.94Zm0-8.47a3.24,3.24,0,1,0,3.23,3.24A3.24,3.24,0,0,0,281.75,100.47Z" fill="#093f68"></path><rect x="124.55" y="125.3" width="10.79" height="70.72" transform="translate(-51.26 61.35) rotate(-22.31)" fill="#f56132"></rect><path d="M138.37,196.42a1,1,0,0,1-.38-.07,1,1,0,0,1-.54-.55l-26.84-65.42a.94.94,0,0,1,0-.77,1,1,0,0,1,.54-.54l10-4.1a1,1,0,0,1,1.3.55L149.29,191a1,1,0,0,1-.55,1.3l-10,4.1A1,1,0,0,1,138.37,196.42Zm-25.54-65.88,26.09,63.58,8.14-3.34L121,127.2Z" fill="#093f68"></path><polygon points="148.36 191.32 149.43 201.01 150.48 210.71 144.43 203.06 138.37 195.42 148.36 191.32" fill="#fff"></polygon><path d="M150.48,211.71a1,1,0,0,1-.79-.38L137.58,196a1,1,0,0,1-.18-.87,1,1,0,0,1,.59-.67l10-4.1a1,1,0,0,1,.89.06,1,1,0,0,1,.49.75l2.11,19.39a1,1,0,0,1-.61,1A1,1,0,0,1,150.48,211.71ZM140,195.84l9.13,11.53-1.6-14.62Z" fill="#093f68"></path><polygon points="149.43 201.01 150.48 210.71 144.43 203.06 149.43 201.01" fill="#093f68"></polygon><path d="M150.48,211.71a1,1,0,0,1-.79-.38l-6.05-7.65a1,1,0,0,1,.41-1.54l5-2a1,1,0,0,1,.89.06,1,1,0,0,1,.48.75l1.05,9.7a1,1,0,0,1-.61,1A1,1,0,0,1,150.48,211.71ZM146,203.48l3.07,3.89-.53-4.93Z" fill="#093f68"></path></g></svg>
            <p className="text-white text-center">Get back and create some content...</p>
             </div>
             
            <div className="flex-1 my-auto ">
            <form onSubmit={submit} className="flex-col flex">
            <label for="name" className="font-bold uppercase text-sm" style={{color:COLORS.text}}>Username</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} name="name" className="outline-none px-5 py-2 rounded-lg text-white focus:ring-2  " style={{backgroundColor:COLORS.primary2}} />
            {error ? <span className="text-red-400">{error}</span> : ''}
            <div className="mt-10 flex justify-center">
            <button disabled={isLoading} className={`text-white font-bold px-20 py-2 rounded-full ${isLoading ? '': 'hover:-translate-y-2 transition duration-500'}`} style={{backgroundColor: isLoading ? COLORS.text : COLORS.primary, boxShadow: isLoading ? 'none' : `0 10px 15px -2px ${COLORS.primary2}`}}>Login</button>
            </div>
              </form>
            </div>
      
        </div>
    </div>
       
    </div> 
    );
}
 
export default Login;