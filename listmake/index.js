// ไฟล์นี้เป็นการวน folder img เพื่อนำข้อมูลมาสร้าง directory tree
// **path คือ ที่อยู่ของ file หรือ directory **
const fs = require('fs');
lnamefile = '.dcm';
folderPath = '../img';
var make=(path)=>{
    console.log(fs.readdirSync(path));
    const list = [];
    fs.readdirSync(path).forEach(file=>{
        const key = `${path}/${file}`;  //เก็บ path ไฟล์ที่ read มาได้ เพื่อที่จะใช้ในการหา path เวลาคลิกรูป ex. path/img
        
        console.log(key);
        const treeNode = {
            title: file,    //ชื่อไฟล์รูป *.dcm ทั้งหมดที่อยู่ใน img
            key:key,    //path ของรูป
        };

        console.log(key);
        if(!file.includes(lnamefile)){  //ตรวจสอบว่าถ้าไม่มี .dcm โดยจะเข้าไฟล์แต่ละไฟล์ไปเรื่อยๆ
            treeNode.children = make(`${path}/${file}`);
        }else{
            treeNode.value = `${path}/${file}`;
        }
        
        list.push(treeNode); 
    })
    return list;
    
}
const arr = make(folderPath);
console.log(arr);
let data = JSON.stringify(arr, null, 2);    //arr = data, null = ตัวแทนค่าว่าง, 2 = ช่องว่าง
fs.writeFileSync('Datalist.json', data, (arr) =>{  
    if(err){throw err;} //ถ้า error โดยคำสั่ง throw คือ เราทำให้เกิดความผิดพลาด โปรแกรมจะหยุดทำงานทันที
    console.log('Data written to file')
});


