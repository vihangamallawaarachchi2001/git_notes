'use client'
import { File } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export type file_t = {
    id: number;
    name: string;
    content: string;
    repositoryId: number;
}

const FileList = () => {
    const userId = Cookies.get('id') as string;
    const [fileList, setFileList] = useState<file_t[] | null>(null);

    useEffect( () => {
        getFileData(userId);
    },[userId])

    const getFileData = async (id: string) => {
        const res = await axios.get(`/api/repo/${id}`)
        if(res) {
            await setFileList(res.data)
        }
    }


  return (
    <section className="max-w-7xl  mx-auto py-3 px-6">
      <div className="rounded-lg shadow-md bg-white">
        <div className="flex items-center justify-between text-gn-notes py-5 px-10">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Files</h3>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            New File
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
        {
            fileList != null ? (
                fileList.map((file: file_t) => (
                    <li key={file.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <File className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        </div>
                      </div>
                      <button className="mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center">
                        View File
                      </button>
                    </li>
                  ))
            ) : (
                <p className="text-md text-gray-600 px-10 py-3 text-center">No files available</p>
            )
        }
        </ul>
      </div>
    </section>
  );
};

export default FileList;
