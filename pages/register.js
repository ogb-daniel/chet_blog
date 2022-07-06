import { COLORS } from "../public/theme";
import React, { useEffect } from 'react'

import Image from "next/image";
import { getAuthors, publish, register, uploadImage } from "../services";
import {useRouter} from 'next/router'
import FormData from "form-data";


const Register = () => {
   const form = new FormData();
    const [image, setImage] = React.useState();
    const [error, setError] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [pic, setPic] = React.useState();
      const router = useRouter();
    const [name, setName] = React.useState();

    
    const handleChange = (e)=>{
      const file = e.target.files[0]
      setPic(file) 
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            setImage(reader.result);
            
          }, false);
       
    }

    
    const submitHandler = async(e)=>{
      e.preventDefault();
      // console.log(form);
      // let file = handler.name;
   
      setIsLoading(true)
      if (!name) {
        setError({
          field:'name',
          message:"Enter your username"
        })
        setIsLoading(false);
        return;
      }
      setError(false)
      form.append("image",pic)
      if(!form){
        return;
      }
      if(!pic){
        setError({
          field:'image',
          message:"Upload an image"
        })
        setIsLoading(false);
        return;
      }
      const authors = await getAuthors(name);
      console.log(authors);
      if(authors.authors.length > 0){
    setError({
          field:'name',
          message:"User Already Exists"
        });
        setIsLoading(false)
        console.log("exist");
        return;
      }
      const imageId = await uploadImage(form)
      console.log(imageId);
      
      const author = await register(name, imageId)
      console.log(author);
      const data = await publish(imageId,author.createAuthor.id);
      if (author) {
        const user = author.createAuthor.id;
        window.localStorage.setItem('user',user);
        router.replace('/')
        setIsLoading(false)
      }
      // console.log(name,image,handler);
      // router.push('/')
    }

    return ( 
    <div className="flex items-center h-screen">
    <div className=" max-w-screen-md mx-auto rounded-xl" style={{backgroundColor:COLORS.primary}}>
    <div className="flex py-4 px-6 md:flex-row flex-col">
            <div className="flex-1">
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="406" height="306" class="illustration styles_illustrationTablet__1DWOa"><rect x="254.56" y="39.42" width="21.28" height="3.78" rx="1.89" transform="translate(-1.8 68.64) rotate(-14.7)" fill="#ffd200"></rect><ellipse cx="192.52" cy="254.72" rx="100.8" ry="14.41" fill="#e6e6e6" opacity="0.3"></ellipse><path d="M194.34,238.73s9.94-1.7,11.58,8.4a1.58,1.58,0,0,1-1.38,1.81,49.59,49.59,0,0,1-13.3-.22C183.52,247.46,188,237.89,194.34,238.73Z" fill="#efefef"></path><path d="M138.7,250s2.25-15.9,14-20.16l25.49-4.49s18.17,1.61,17.44,23.73A158.52,158.52,0,0,1,138.7,250Z" fill="#e6e6e6"></path><path d="M244.14,162.73s-15.34-4-13.81,4.51v57.33h5.44a3.51,3.51,0,0,0,3.51-3.51V207.27c1.65-.22,3.47-1.18,3.95-4.21.93-5.84,0-31.95,0-31.95s11.68-2.46,18.44,1.23v-7.69Z" fill="#ffd200"></path><path d="M235.46,29.7s27.46,22.11,26,67.13c0,0,16.63-52.46.42-79.64Z" fill="#ffd200"></path><path d="M235.46,29.7s27.46,22.11,26,67.13c0,0,16.63-52.46.42-79.64Z" fill="#fff" opacity="0.46"></path><path d="M155.52,70s-24,46.39,5.53,52.69S198.9,91.42,198.9,91.42s-4.69-18-12.52-17.59S171.32,88.41,167,98.71a3.49,3.49,0,0,1-6.68-.89c-1-7.29-3.53-17,1.27-25.74,0,0,6.68-4.07,4.38-9.58S155.52,61.71,155.52,70Z" fill="#f4a28c"></path><path d="M263.43,241s-7.41-2-9-8.92c0,0,11.48-2.32,11.81,9.53Z" fill="#68e1fd" opacity="0.58"></path><path d="M264.33,240.31s-5.17-8.19-.62-15.84c0,0,8.73,5.55,4.85,15.86Z" fill="#68e1fd" opacity="0.73"></path><path d="M265.67,240.31s2.73-8.64,11-10.28c0,0,1.55,5.62-5.35,10.31Z" fill="#68e1fd"></path><polygon points="260.29 240.12 261.8 250.4 271.26 250.44 272.65 240.17 260.29 240.12" fill="#24285b"></polygon><path d="M148.61,84.77,159.67,87l2-14.88s6-3.16,5.87-6.93a5.07,5.07,0,0,0-6.45-5c-4,1.11-5.6,7.48-6.91,11.95S148.61,84.77,148.61,84.77Z" fill="#24285b"></path><rect x="132.26" y="57.57" width="127.58" height="3.78" rx="1.89" transform="translate(-8.67 51.69) rotate(-14.7)" fill="#ffd200"></rect><path d="M172.18,92.52a19.79,19.79,0,0,1,19.37-20.41c13.67-.28,35-6.88,43.09,5.27C247,96.06,227,148.62,227,148.62H190.05S172.89,113.37,172.18,92.52Z" fill="#68e1fd"></path><polygon points="199.16 52.93 204.74 72.58 193.06 77.38 193.49 60.42 199.16 52.93" fill="#f4a28c"></polygon><path d="M193.24,64.13A8.2,8.2,0,0,0,197,61.24s.31,4.16-3.74,8.78Z" fill="#ce8172" opacity="0.31"></path><path d="M186.42,53.57S187,60.49,189,64.81a3.49,3.49,0,0,0,4.63,1.73c2.16-1,4.8-3,4.92-6.76l1-6.33a6.25,6.25,0,0,0-3.87-6.08C191.3,45.28,185.83,49.38,186.42,53.57Z" fill="#f4a28c"></path><path d="M188.17,53.55a27.57,27.57,0,0,0,6.21-1.6,5.77,5.77,0,0,0,1.11,6.25,4.72,4.72,0,0,0,5.94.86l-1.67-8.76a7.08,7.08,0,0,0-4.64-5.58,24.86,24.86,0,0,0-3.18-.92c-2.71-.56-6.11,1.78-8.68.48a1.68,1.68,0,0,0-2.43,1.54c.08,2.75,1.31,6.86,5.18,7.68A6.52,6.52,0,0,0,188.17,53.55Z" fill="#24285b"></path><path d="M194.72,58.13s-.41-2.64,1.6-2.79,2.64,3.66,0,4.5Z" fill="#f4a28c"></path><path d="M187,57.91l-1.43,3a1.11,1.11,0,0,0,1,1.59l2.7,0Z" fill="#f4a28c"></path><path d="M158.06,65.15s-1.27,4.07,3.22,3.49,5.76-1,6.22-3.49S159.44,62.47,158.06,65.15Z" fill="#f4a28c"></path><path d="M189.29,72.08s-.41-3.33,4-3.38A8.93,8.93,0,0,0,203.15,67s8.39-.08,9.07,6.66S197,97.58,197,97.58,187.34,83.82,189.29,72.08Z" fill="#68e1fd"></path><path d="M218.48,82.28a19.65,19.65,0,0,0-4,15.3c1.61,8.85,15.15,33.81.47,51h12c-.23.81,6.92-21.62,8.92-30.61C237.1,112.53,218.48,82.28,218.48,82.28Z" opacity="0.09"></path><path d="M189.29,72.08s-.41-3.33,4-3.38A8.93,8.93,0,0,0,203.15,67s8.39-.08,9.07,6.66S197,97.58,197,97.58,187.34,83.82,189.29,72.08Z" fill="#fff" opacity="0.68"></path><path d="M218.42,88.24c-2.5-10.17,8.59-18.41,17.52-12.95,7.65,4.68,15,13.49,16.9,30.07,4.23,37.48,0,56.22,0,56.22l-7.91-1.53s-6-48.9-17.36-55.87C222.8,101.25,220,94.77,218.42,88.24Z" fill="#f4a28c"></path><path d="M225.71,102.77s16.45-5.09,24.6-11.85c0,0,2.76,7.68,2.53,14.44a85.55,85.55,0,0,1-19.14,7.22A85.59,85.59,0,0,1,225.71,102.77Z" fill="#24285b"></path><path d="M244.93,160.05s-5.06,14.37,2.31,14.38c11.28,0,5.6-12.85,5.6-12.85Z" fill="#24285b"></path><rect x="233.52" y="168.76" width="7.26" height="35.37" rx="3.63" fill="#fff" opacity="0.46"></rect><path d="M190.05,148.62s-47,8.62-39.14,32.53,14.29,35.43,14.29,35.43l9.61-4.61-3.93-25.4a9.65,9.65,0,0,1,8.56-11.08c17.09-1.75,49.56-7.62,47.52-26.87Z" fill="#24285b"></path><path d="M227,148.62l-2.38,91H214.22s.46-57.27-17.67-80.16Z" fill="#24285b"></path><polygon points="152.73 191.76 170.88 186.57 176.49 216.58 178.22 225.34 152.73 229.83 164.51 219.57 152.73 191.76" fill="#68e1fd"></polygon><path d="M174.81,152.89l9.71,22.67,11.31-2.14-9.78-23.92A58.83,58.83,0,0,0,174.81,152.89Z" fill="#ffd200"></path><path d="M211.29,202.75l14.22,1.39-.25,31.72a11.15,11.15,0,0,0,2.1,6.6l6.16,8.53-16.13-2.73-6.1-1.42,2.18-8.11Z" fill="#68e1fd"></path><path d="M132.65,241.64c5.27-5.4,19.88-4.78,21.83,1.09.74,2.22,1.32,4.43,1.75,6.33a5.8,5.8,0,0,1-4.36,6.95C145,257.58,116.87,257.81,132.65,241.64Z" fill="#d3d3d3"></path><polygon points="166.04 192.54 172.88 190.85 177.41 216.58 171.73 217.73 166.04 192.54" fill="#68e1fd"></polygon><polygon points="166.04 192.54 172.88 190.85 177.41 216.58 171.73 217.73 166.04 192.54" fill="#fff" opacity="0.35"></polygon><path d="M183.78,134.44s2.77,9.36,6.27,14.18H227a126.54,126.54,0,0,0,4.7-14.18S213.43,138.6,183.78,134.44Z" fill="#ffd200"></path><rect x="213.6" y="140.88" width="16.98" height="16.98" fill="#ffd200"></rect><rect x="213.6" y="140.88" width="16.98" height="16.98" opacity="0.09"></rect><circle cx="222.09" cy="146.82" r="2.17" fill="#fff"></circle></svg>     
       <p className="text-white text-center">The blog is in your hands...</p>
             </div>
             <form className="flex-1" onSubmit={submitHandler} enctype="multipart/form-data">
            <div className=" flex-col flex my-auto ">
         
            <label className=" text-white self-center ">
            <div className="overflow-hidden flex-col p-1 h-40 w-40 mb-3 rounded-full self-center items-center flex justify-center hover:cursor-pointer" style={{background:COLORS.primary2}}>
            
    {image  ? <Image src={image} width="160px" height="160px" className="rounded-full object-cover " /> : (
      <span className="items-center flex justify-center flex-col">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4l2-2zm3 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="rgba(56,59,123,1)"/>
        </svg>
        <p>Upload an image</p>
     
      </span>
      
    )}
                   
            <input className="hidden" onChange={handleChange} type="file"  name="image"/>
            
            
            </div>
            <span className='text-red-500 text-lg font-semibold'>
{error && error.field === 'image' ? error.message : ''}
</span> 
            </label>
            
            <label for="name" className="font-bold uppercase text-sm" style={{color:COLORS.text}}>Name</label>
            <input type="text" name="name" onChange={(e)=>setName(e.target.value)} className="outline-none px-5 py-2 rounded-lg text-white focus:ring-2  " style={{backgroundColor:COLORS.primary2}} />
            <span className='text-red-500 text-lg font-semibold'>
{error && error.field === 'name' ? error.message : ''}
</span>
             <div className="mt-10 flex justify-center">
            <button disabled={isLoading} className={`text-white font-bold px-20 py-2 rounded-full ${isLoading ? '': 'hover:-translate-y-2 transition duration-500'}`} style={{backgroundColor: isLoading ? COLORS.text : COLORS.primary, boxShadow: isLoading ? 'none' : `0 10px 15px -2px ${COLORS.primary2}`}}>Register</button>
            </div>
        
            </div>
       
            </form>
        </div>
    </div>
       
    </div> 
    );
}


export default Register;