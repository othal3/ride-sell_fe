import React, { useEffect, useState } from "react";

function PostCard({ post }) {
   const [author, setAuthor] = useState(null);
   const getAuthors = async () => {
      if (post.authorType === "userModel") {
         try {
            const response = await fetch(
               `${process.env.REACT_APP_SERVER_BASE_URL}/user/${post.author}`
            );
            const data = await response.json();
            setAuthor(data);
         } catch (e) {
            console.log(e);
         }
      } else {
         try {
            const response = await fetch(
               `${process.env.REACT_APP_SERVER_BASE_URL}/company/${post.author}`
            );
            const data = await response.json();
            setAuthor(data);
         } catch (e) {
            console.log(e);
         }
      }
   };

   useEffect(() => {
      getAuthors();
   }, []);

   return (
      <div>
         <div>{post.img}</div>
         <div>
            <div>
               <p>
                  <span>{post.make}</span>
                  <span> {post.model}</span>
               </p>
            </div>
            <div>
               <span>{post.km}</span>
               <span>{post.year}</span>
               <span>{post.fuelType}</span>
               <span>
                  {post.power} kw ({parseInt(post.power * 1.35962)} cv)
               </span>
            </div>
         </div>

         {author && post.authorType === "userModel" && (
            <div>
               <img
                  src={author.user.avatar}
                  className=" w-10 h-10 object-cover rounded-full "
               />
               <p>
                  <span>{author.user.firstName}</span>
                  <span> {author.user.lastName}</span>
               </p>
            </div>
         )}

         {author && post.authorType === "companyModel" && (
            <div>
               <img
                  src={author.company.avatar}
                  className=" w-10 h-10 object-cover rounded-full "
               />
               <p>{author.company.name}</p>
            </div>
         )}
      </div>
   );
}

export default PostCard;
