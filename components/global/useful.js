// import React, { useEffect, useState } from "react";
// import axios from "axios";


// const url = "http://localhost:3000/api/usp";
//   const [dataApi, setData] = useState([]);
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       const request = await axios.get(url);
//       const getData = request.data;
//       setData(getData);
//       setLoading(false);
//       console.log(dataApi.usp);
//     }
//     fetchData();
//   }, []);