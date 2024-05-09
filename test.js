import needle from 'needle';

needle.post('http://localhost:3000/register', {
    fname: "Sha Sha Marie",
    lname: "Dineros",
    email: "smdineros1234@up.edu.ph",
    password: "ps1234",
}, (err,res) => {
    console.log(res.body);
});

needle.post('http://localhost:3000/register', {
    fname: "Kim",
    lname: "Ji Won",
    email: "kjw@up.edu.ph",
    password: "passsss",
}, (err,res) => {
    console.log(res.body);
});

// needle.post('http://localhost:3000/login', {
//     email: "smdineros1234@up.edu.ph",
//     password: "ps1234",
// }, (err,res) => {
//     console.log(res.body);
// });

needle.get('http://localhost:3000/get-users', (err,res) => {
     console.log(res.body);
});







