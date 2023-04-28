import { useState } from "react";
import { TokenInfo } from "../constants"
import { getTokenInfo } from "../utils";

interface AddTokenRowProps{
    addToken(token:TokenInfo):void;
}

export default function AddTokenRow(props:AddTokenRowProps){
    const [formData, setFormData] = useState<any>({});
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // do something with formData
        console.log(formData)
        const tokenInfo = await getTokenInfo(formData.collectionId, formData.tokenId)
        props.addToken(tokenInfo)
      };
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

    return   <form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between">
        <div className="flex gap-10">
            <div className="mb-4 ">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Collection Id
                </label>
                <input onChange={handleChange} className="required shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="collectionId" type="text" placeholder="eg: 0x37a03d4af1d7046d1126987b20117a0fdcbf6535"/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Token Id
                </label>
                <input onChange={handleChange} className="required shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="tokenId" type="text" placeholder="eg: 2"/>
            </div>
        </div>
       
        <button className="bg-black hover:bg-blue-700 text-white font-bold  px-4 rounded-lg focus:outline-none focus:shadow-outline" type="submit">
            Add to Favorites
        </button>

    </form>
}