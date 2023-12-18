// storing data into the mongo db
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // console.log(data);
    //     // fetch api to post data
    //     await fetch('http://localhost:5000/api/createuser', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     }).then(() => {
    //         alert("Data successfully added");
    //     }).catch(() => {
    //         alert("Something went wrong")
    //     })
    // }
    // fetch api to get all user data
    // const fetchData = async () => {
    //     const url = 'http://localhost:5000/api/fetchuser';
    //     const response = await fetch(url);
    //     if (response.status) {
    //         const users = await response.json();
    //         console.log(users);
    //     } else {
    //         console.log('Error fetching data');
    //     }
    // } fetchData();