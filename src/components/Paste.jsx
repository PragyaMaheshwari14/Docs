import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromePastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { LuCopy } from 'react-icons/lu';
import { FaShareSquare } from 'react-icons/fa';

const Paste = () => {

   const pastes = useSelector((state)=> state.paste.pastes);
   const dispatch = useDispatch();
   const [searchTerm, setSearchTerm] = useState('');
   const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
   );

   function handleDelete(pasteId) {
      dispatch( removeFromePastes(pasteId));
   }

   function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        })
        .then(() => {
          toast.success('Content shared successfully!');
        })
        .catch((error) => {
          toast.error('Error sharing content: ' + error);
        });
    } else {
      toast.error('Web Share API is not supported in your browser.');
    }
  }
  return (
    <div  className="w-full p-4 text-white flex justify-center">
       
       <div className='w-full md:w-[85%]'>
        <div className="searchbox flex justify-center">
        <input 
           className='mb-4 py-2 px-3 w-[80%] md:w-[50%] rounded-full bg-[#333333] focus:outline-none  '
           type='search'
           placeholder='search here'
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        <div className='w-full gap-4 flex flex-evenly md:justify-start  '>
          {
            filteredData.length > 0 && 
            filteredData.map(
               (paste) => {
                  return (
                    <div className="card relative p-4 bg-[#333333] w-[18vw] h-[22vw] rounded-[3vw] overflow-hidden " key={paste?._id}>
                        <div className="font-semibold text-[4vw] md:text-base ">
                          { paste.title}
                        </div>
                        <div className="border border-[#777777] mt-2 mb-2"></div>
                        <div className="mb-2 text-[3.5vw] md:text-sm" >
                          {paste.content}
                        </div>
                        <div  className="footer absolute p-2 md:p-4 w-full bottom-0 left-0 bg-[#2477cb]">
                          <div className='flex justify-between gap-3 md:gap-5'>
                            <button className="text-white text-[4vw] md:text-[2vw]">
                              <a href={`/?pasteID=${paste?._id}`}>
                                {/* Edit */}
                                <CiEdit />
                              </a>
                            </button>

                            {/* <button className="text-black text-[4.5vw] md:text-[1.75vw]">
                              <a href={`/pastes/${paste._id}`}> View</a> 
                            </button> */}

                            <button  
                              onClick={() => handleDelete(paste?._id)}
                               className="text-white text-[3.5vw] md:text-[1.75vw]"
                            >
                              {/* Delete */}
                              <MdDeleteOutline />
                            </button>

                            <button onClick={() => {
                                 navigator.clipboard.writeText(paste?.content)
                                 toast.success("copied to clipboard");
                                 className="text-white text-[5vw] md:text-[1.5vw]"
                            }}>
                              {/* Copy */}
                              <LuCopy />
                            </button>

                            <button 
                              onClick={() => handleShare(paste)}
                              className="text-white text-[3vw] md:text-[1.4vw]" >
                              {/* Share */}
                              <FaShareSquare />
                            </button>
                        </div>
                      </div>
                        {/* <div>
                          {paste.createdAt}
                        </div> */}
                      </div>
                  )
                }
                 
            )
          }

        </div>

    </div>
    </div>
  )
}

export default Paste