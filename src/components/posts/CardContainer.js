import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

function CardContainer() {
   const [posts, setPosts] = useState(null);

   const getPosts = async () => {
      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/posts`
         );
         const data = await response.json();
         setPosts(data);
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      getPosts();
   }, []);

   return (
      <div className="grid grid-cols-3 justify-items-center gap-8 mx-10">
         {posts &&
            posts.post.map((posts) => (
               <PostCard key={posts._id} post={posts} />
            ))}
      </div>
   );
}

export default CardContainer;
