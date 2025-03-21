import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromePastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { LuCopy } from 'react-icons/lu';
import { FaShareSquare } from 'react-icons/fa';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromePastes(pasteId));
    toast.success('Docs deleted successfully!');
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
    <div className="w-full p-4 text-white flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Search Box */}
        <div className="searchbox flex justify-center mb-4">
          <input
            className="py-2 px-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] rounded-full bg-[#333333] focus:outline-none"
            type="search"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Paste Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredData.length > 0 &&
            filteredData.map((paste) => (
              <div
                className="card relative p-4 bg-[#333333] rounded-lg overflow-hidden flex flex-col justify-between"
                key={paste?._id}
              >
                {/* Title */}
                <div className="font-semibold text-lg truncate mb-2">
                  {paste.title}
                </div>

                {/* Divider */}
                <div className="border border-[#777777] my-2"></div>

                {/* Content */}
                <div className="text-sm md:text-base mb-4 overflow-hidden h-[10vw] md:h-[8vw]">
                  <p className="overflow-y-auto">{paste.content}</p>
                </div>

                {/* Footer */}
                <div className="footer p-2 bg-[#c0c0c0] rounded-lg flex justify-between items-center text-white">
                  {/* Edit Button */}
                 <button className="flex items-center text-base md:text-lg">
                 <a href={`/?pasteId=${paste?._id}`}>
                    <CiEdit />
                  </a>
                 </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="flex items-center text-base md:text-lg"
                  >
                    <MdDeleteOutline />
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success('Copied to clipboard');
                    }}
                    className="flex items-center text-base md:text-lg"
                  >
                    <LuCopy />
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => handleShare(paste)}
                    className="flex items-center text-base md:text-lg"
                  >
                    <FaShareSquare />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Paste;
