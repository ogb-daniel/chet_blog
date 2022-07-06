import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { COLORS } from "../public/theme";
import { getCategories, getUser } from "../services";
import { useRouter } from 'next/router'
const Header = () => {
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState();
  const [toggle, setToggle] = useState(true);
  
  
  let comp = author ? (
 
 <div className="flex mt-2 items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 ">
          <img
            src={author.photo.url}
            alt={author.name}
            className="align-middle rounded-full w-10 h-10 object-cover"
          />
             <Link href='/profile'>
          <span className="inline align-middle text-white ml-2 text-lg cursor-pointer">
            {author.name}
          </span>
          
              </Link>
              <span className="align-middle text-white ml-4 font-semibold cursor-pointer" onClick={()=>{
                window.localStorage.removeItem("user")
                window.location.reload()
              }}>SignOut</span>
        </div>

   
  ): (
  <div className="flex ">
      
      <div className="mt-2">
    <Link href={'/login'} ><span className="align-middle text-white ml-4 font-semibold cursor-pointer">Login</span></Link>
   </div>
   <div className="mt-2">
    <Link href={'/register'} ><span className="align-middle text-white ml-4 font-semibold cursor-pointer">Register</span></Link>
   </div>
  </div>


  )

  const toggleClick=()=>{
    setToggle((value)=>!value);
    const dropdown = document.getElementById("dropdown");
    if (toggle) {

    dropdown.classList.remove("hidden");
    }else{
      dropdown.classList.add("hidden");
    }
  }

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem("user")
    getUser(user).then((data)=> setAuthor(data.author))
    console.log(author);
  }, [])
  
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b-4  w-full inline-block py-8" style={{borderColor:COLORS.primary}}>
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              ChetBlog
            </span>
          </Link>
        </div>
        <div className="md:float-right">
        <div className="flex items-center">
        
   
          <div className="mt-2">
          <button id="dropdownDefault" onClick={toggleClick} class="focus:outline-none align-middle text-white ml-4 font-semibold rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">Categories<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
<div id="dropdown" class="z-10 absolute hidden divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700" style={{backgroundColor:COLORS.primary}}>
    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
     
      {categories.map((category, index) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{category.name}</a>
      </li>
            </Link>
          ))}
    </ul>
</div>
          </div>
         {comp}
    </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
