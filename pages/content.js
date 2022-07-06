import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import { convertToRaw } from 'draft-js';
import FormData from "form-data";
const Editor = dynamic(
() => import('react-draft-wysiwyg').then(mod => mod.Editor),
{ ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { COLORS } from '../public/theme';
import { createPost, getCategories, publishPost, uploadImage } from '../services';

const Content = ()=>{
    const form = new FormData();
    const [image, setImage] = React.useState();
    const [categories, setCategories] = React.useState([]);
    const router = useRouter();
    const [blocks, setBlocks] = React.useState([]);
    const [selected,setSelected] = React.useState([]);
    const [pic, setPic] = React.useState();
    const [author, setAuthor] = React.useState();
    const [error, setError] = React.useState({});
    const [title, setTitle] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [editor, setEditor] = React.useState("");
    const wrapperStyle = {
        border: '1px solid #969696',
    }
    const editorStyle = {
        height:'20rem',
        padding:'1rem',
        backgroundColor:'white'
    }
    const handleChange=(e)=>{
        const file = e.target.files[0]
        setPic(file) 
          let reader = new FileReader();
          reader.readAsDataURL(file)
          reader.addEventListener("load", function () {
              // convert image file to base64 string
              setImage(reader.result);
              
            }, false);
    }
    const handleEditorStateChange=(e)=>{
        let text = [];
        setBlocks(convertToRaw(e.getCurrentContent()).blocks);
        blocks.forEach((block)=>{
           text.push(block.text);
        })
        setEditor(text.join(''))
   
    }
    useEffect(() => {
        getCategories().then((newCategories) => setCategories(newCategories));
        setAuthor(window.localStorage.getItem("user"));
    },[])
    
    const submit =async (e)=>{
        e.preventDefault();
        // console.log(form);
        // let file = handler.name;
        let content = [];
        blocks.forEach((block)=>{
            content = 
                [
                 ...content,
                 {
                    "type": "paragraph",
                    "children": [
                      {
                        "text": block.text
                      }
                    ]
                }
            ]
        })
       
        setIsLoading(true)
        if (!title) {
          setError({
            field:'title',
            message:"Enter a title"
          })
          setIsLoading(false);
          return;
        }
        setError("");
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
        if(content.length === 0){
            setError({
                field:'content',
                message:'Enter a content'
            })
            setIsLoading(false);
            return;
        }
        let slug;
        let tags = [];
 
        const values = title.split(' ');
        if(values.length > 1){
            slug = title.split(' ').join('-').toLowerCase();
        }else{
            slug = title.toLowerCase();
        }   

        let excerpt;
        excerpt = editor.slice(0,200).toString();
        let raw = {
            children:content
        };
        selected.forEach((category)=>{
            tags.push({name:category})
        })
        console.log(title,slug,tags,excerpt);
        const imageId = await uploadImage(form)
        console.log(imageId);
       
        const post = await createPost(title,slug,excerpt,raw,imageId,author,tags);
        console.log(post);

        const data = await publishPost(imageId,post.createPost.id);

        if (data) {
            console.log('post created');
            setIsLoading(false) 
            router.push('/profile')
        }else{
            console.log('failed');
            setIsLoading(false)
        }
       
       
    }

    const handleCategory=(e)=>{
        
        let text = e.target.innerText;
   if (selected.includes(text)) {
    setSelected((tag) => tag.filter(function(value){ 
        return value != text;
    }))
   }else{
    setSelected((val)=>[...val,text])
   }
    
    }
   
   return (
    <div className='min-h-screen flex justify-center items-center'>
    <form onSubmit={submit}>
    <p className='text-white font-semibold mb-3 text-xl'>New Post</p>
   
    <div className='flex flex-col w-full max-w-screen-lg mb-3'>
    <label for="name" className="font-bold uppercase text-sm" style={{color:COLORS.text}}>Title</label>
    <input type="text" name="name" onChange={(e)=>setTitle(e.target.value)} className='outline-none px-5 py-2 rounded-md text-black focus:ring-2 ' />
    <span className='text-red-500 text-lg font-semibold'>
    {error.field === 'title' ? error.message : ''}
    </span>
    </div>
    
    <div className='w-full bg-black max-w-screen-lg rounded-md mb-2'>
    <label className=" text-white self-center ">
            <div className="p-1 w-full h-36 rounded-md cursor-pointer flex justify-center" style={{background:COLORS.primary}}>
            
    {image  ? <img src={image} className="max-h-full min-w-full object-cover rounded-md " /> : (
      <span className="items-center flex justify-center flex-col">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4l2-2zm3 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="rgba(56,59,123,1)"/>
        </svg>
        <p>Upload an image</p>
      </span>
      
    )}
                   
            <input className="hidden" onChange={handleChange} type="file"  name="image"/>
            
            
            </div>
            </label>
            <span className='text-red-500 text-lg font-semibold'>
            {error && error.field === 'image' ? error.message : ''}
            </span>
    </div>
    <div className='container mx-auto max-w-screen-lg'>
    <Editor
  wrapperStyle={wrapperStyle}
editorStyle={editorStyle} 
onEditorStateChange={handleEditorStateChange}
/>
<span className='text-red-500 text-lg font-semibold'>
{error && error.field === 'content' ? error.message : ''}
</span>
    </div>
    <div className='mt-3 flex items-center'>
        <p className='text-white mr-3 font-semibold'>Categories: </p>
        {categories.map(({name},key)=>(
            <span onClick={handleCategory} className={`rounded-full px-4 py-1 mr-2 cursor-pointer ${selected.includes(name) ? 'text-black' : 'text-white'} `} style={{backgroundColor:selected.includes(name) ? 'white' : COLORS.primary}}>{name}</span>
        ))}
    </div>
    <button disabled={isLoading} className={`text-white font-bold px-20 py-2 w-full rounded-md my-3`} style={{backgroundColor: isLoading ? COLORS.text : COLORS.primary, boxShadow: isLoading ? 'none' : `0 10px 15px -2px ${COLORS.primary2}`}}>Create content</button>
    </form>
    </div>
   
   )
}
export default Content;