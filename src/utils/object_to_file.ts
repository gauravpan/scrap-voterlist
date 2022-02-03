
import fs from 'fs/promises'

export function objectToFile(obj: any, objName: string, fileName: string) {
    const data = `
    
export const ${objName} = ${JSON.stringify(obj)}

    `;
    console.log(` Saving ${fileName}...`)
    return fs.writeFile(`data/${fileName}`, data)
}