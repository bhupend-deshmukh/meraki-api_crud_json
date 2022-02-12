const axios = require("axios");
const fs = require('fs');

axios
.get('http://api.navgurukul.org/courses')
.then((res)=>{
    console.log(res.data);
    fs.writeFileSync("Courses.json", JSON.stringify(res.data, null, 4));
}).catch((err)=>{
    console.log(err);
})