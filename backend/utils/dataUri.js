import DatauriParser from "datauri/parser.js";

import path from "path";

const getDataUri = (file)=> {
    const parser = new DatauriParser()
    const exitName = path.extname(file.originalname).toString() 
    return parser.format(exitName, file.buffer)

}


export default getDataUri