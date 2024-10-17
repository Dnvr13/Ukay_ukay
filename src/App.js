import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import ResetPasswordForm from './components/ResetPassword/ResetPasswordForm';
import LoadingComponent from './components/LoadingComponent/LoadingComponent';
import Home from './components/HomeComponents/Home';
import Items from './components/ItemsComponents/Items';
import './App.css';
import Admin from './pages/admin.page';
import NotFound from './pages/404.page';
import Cart from './components/CartComponents/Cart';
import supabase from './config/supabase.config';
import { useCartBackend } from './backend/cart.backend';
import HeaderComp from './components/zcomp/header.comp';
import HomeTest from './pages/home.page';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust timing if necessary

    return () => clearTimeout(timer);
  }, []);


  return (
    <Router>
      {loading ? (
        <LoadingComponent isFadingOut={false} />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ResetPasswordForm />} />
          <Route path="/loading" element={<LoadingComponent isFadingOut={true} />} />
          <Route path="/home" element={<Home />} /> {/* Existing Home Route */}
          <Route path="/items" element={<Items />} /> {/* New Items Route */}
          <Route path='/admin' element={<Admin/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/test' element={<HomeTest/>} />
          <Route path='*' element={<NotFound/>} />

        </Routes>
      )}
    </Router>
  );

 



  // const [countries, setCountries] = useState([]);

  //   useEffect(() => {
  //     getCountries();
  //   }, []);

  //   async function getCountries() {
  //     const { data } = await supabase.from("countries").select();
  //     data.map((i,data)=>{
  //       console.log(i,data)
  //     })
  //     setCountries(data);
  //   }


  // return(
  //   <ul>
  //   {countries.map((country) => (
  //     <li key={country.name}>{country.name}</li>
  //   ))}
  // </ul>
  // );




  // upload single file

  // const [file, setFile] = useState(null);
  //   const [imageUrl, setImageUrl] = useState('');

  //   const handleFileChange = (event) => {
  //       const selectedFile = event.target.files[0];
  //       if (selectedFile) {
  //           setFile(selectedFile);
  //       }
  //   };

  //   const uploadImage = async () => {
  //       if (!file) return;

  //       const { data, error } = await supabase.storage
  //           .from('avatars') // Your bucket name
  //           .upload(`public/${file.name}`, file, {
  //               cacheControl: '3600',
  //               upsert: true,
  //               contentType: file.type,
  //           });

  //       if (error) {
  //           console.error('Error uploading file:', error);
  //       } else {
  //           const { publicURL, error: urlError } = supabase.storage
  //               .from('avatars')
  //               .getPublicUrl(data.path);

  //           if (urlError) {
  //               console.error('Error getting public URL:', urlError);
  //           } else {
  //               setImageUrl(publicURL); // Set the image URL for display
  //           }
  //       }
  //   };

  //   return (
  //     <div>
  //         <input type="file" onChange={handleFileChange} />
  //         <button onClick={uploadImage} className='bg-red-300 rounded-md'>Upload Image</button>
  //         {imageUrl && <img src={imageUrl} alt="Uploaded" />}
  //     </div>
  // );



  // upload multiple file
  //   const uploadImages = async (files) => {
  //     const promises = Array.from(files).map(async (file) => {
  //         const { data, error } = await supabase
  //             .storage
  //             .from('avatars')
  //             .upload(`public/${file.name}`, file, {
  //                 cacheControl: '3600',
  //                 upsert: true,
  //             });
  //         if (error) throw error;
  //         return data.Key; // Or handle the uploaded file's data as needed
  //     });
  //     return Promise.all(promises);
  // };

  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   uploadImages(files)
  //       .then((results) => {
  //           console.log('Uploaded files:', results);
  //       })
  //       .catch((error) => {
  //           console.error('Upload error:', error);
  //       });
  // };

  // return (
  //   <>
  //   <input type="file" multiple onChange={handleFileChange} />  
  //   </>
  // );


  // fetch images
  // const [imageUrls, setImageUrls] = useState([{
  //   url: ""
  // }]);

  // const fetchImages = async () => {
  //   const { data, error } = await supabase
  //     .storage
  //     .from('avatars') // Your bucket name
  //     .list('public', { sortBy: { column: 'name', order: 'asc' } }); // Specify directory

  //   if (error) {
  //     console.error('Error fetching images:', error);
  //     return [];
  //   }

  //   // Filter to include only image files
  //   const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
  //   const filteredImages = data.filter(image =>
  //     image.name && imageExtensions.some(ext => image.name.toLowerCase().endsWith(ext))
  //   );

  //   return filteredImages; // List of filtered image objects
  // };


  // const displayImages = async () => {
  //   // const images = await fetchImages();
  //   // // const urls = getImageUrls(images);
  //   // const urls = images.map((image)=>{
  //   //   return await getPublicUrl(`public/${image.name}`);;
  //   // })


  //   const images = await fetchImages();
  //   const urls = await Promise.all(images.map(async (image) => {
  //     return await getPublicUrl(`public/${image.name}`);
  //   }));

  //   console.log("URLS", urls);
  //   setImageUrls(urls); // Set state with image URLs
  // };

  // useEffect(() => {
  //   displayImages();
  // }, []);

  // async function xx(xx) {
  //   const x = await getPublicUrl(`public/${xx}`);
  //   console.log("IMGE URL: ", x);
  //   return x;
  // }

  // async function getPublicUrl(filePath) {
  //   const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  //   return data.publicUrl;
  // }

  // return (
  //   <div>
  //     <h1>Image Gallery</h1>
  //     <div>
  //       {imageUrls.map((url, index) => (
  //         <img key={index} src={url} alt={`Image ${index}`} style={{ width: '100px', height: '100px' }} />
  //       ))}
  //     </div>
  //   </div>
  // );


}

export default App;
