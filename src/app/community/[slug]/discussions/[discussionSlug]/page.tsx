// 'use client';

// import { useParams } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { FaArrowUp, FaArrowDown, FaReply } from 'react-icons/fa';
// import { getCommunityDiscussion,addDiscussionComment } from '@/actions/CommunityDiscussion';
// import { BiUpvote, BiDownvote, BiCommentDetail } from 'react-icons/bi';
// import { NavbarComponent } from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import moment from 'moment';


// const DiscussionPage = () => {
//   const [newComment, setNewComment] = useState('');
//   const [replyCommentId, setReplyCommentId] = useState(null);
//   const { communitiesDiscussions, isLoading } = useSelector((state:any) => state.communitiesDiscussions);

//   const { discussionSlug } = useParams();
//   const dispatch = useDispatch();

//   const [user, setUser] = useState<any>(null);
//   useEffect(() => {
//     const profile = localStorage.getItem("profile");
//     if (profile) {
//       setUser(JSON.parse(profile));
//     }
//   }, []);

//   useEffect(() => {
//     if (discussionSlug) {
//       dispatch<any>(getCommunityDiscussion({ discussionSlug:discussionSlug }));
//     }
//   }, [discussionSlug]);

//   const handleAddComment = async (parentCommentId = null) => {
//     if (!newComment) return;
//     try {
//       const discussionId = communitiesDiscussions?.[0]?.discussion?.discussionId;
//       // Assume there's an action to add a comment
//       await dispatch<any>(addDiscussionComment({ discussionId:discussionId,content: newComment, parentComment:parentCommentId,createdBy:user?.user?.userId }));
//       setNewComment('');
//       setReplyCommentId(null);
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   function TimeAgo(commentedAt:any) {
//     const time = moment(commentedAt);
//     const differenceInMinutes = moment().diff(time, 'minutes');

//     if (differenceInMinutes < 1) {
//       return <span>just now</span>;
//     } else if (differenceInMinutes < 60) {
//       return <span>about {differenceInMinutes} minute{differenceInMinutes !== 1 ? 's' : ''} ago</span>;
//     } else if (differenceInMinutes < 1440) {
//       const hours = Math.floor(differenceInMinutes / 60);
//       return <span>about {hours} hour{hours !== 1 ? 's' : ''} ago</span>;
//     } else {
//       const days = Math.floor(differenceInMinutes / 1440);
//       return <span>about {days} day{days !== 1 ? 's' : ''} ago</span>;
//     }
//   }

//   const renderComments = (comments:any, parentCommentId = null) => {
//     return comments
//       .filter((comment:any) => comment.parentComment === parentCommentId)
//       .map((comment:any) => (
//         <div key={comment._id} className="mb-4 ml-4">
//           <div className="flex items-center mb-2">
//             <img src={comment.createdBy.photo} alt={comment.createdBy.name} className="w-8 h-8 rounded-full object-cover" />
//             <div className="ml-2">
//               <div className="font-semibold">{comment.createdBy.name}</div>
//               <div className="text-gray-500 text-sm">{TimeAgo(comment.createdAt)}</div>
//             </div>
//           </div>
//           <div className="bg-gray-100 p-2 rounded">{comment.content}</div>
//           <div className="flex items-center space-x-4 text-gray-600 mt-2">
//             <button className="flex items-center text-green-500">
//               <FaArrowUp className="mr-1" /> {comment.upvotes.length}
//             </button>
//             <button className="flex items-center text-red-500">
//               <FaArrowDown className="mr-1" /> {comment.downvotes.length}
//             </button>
//             <button className="flex items-center" onClick={() => setReplyCommentId(comment._id)}>
//               <FaReply className="mr-1" /> Reply
//             </button>
//           </div>
//           {replyCommentId === comment._id && (
//             <div className="mt-2">
//               <textarea
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none"
//                 placeholder="Add a reply..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//               />
//               <button onClick={() => handleAddComment(comment._id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mt-2">
//                 Reply
//               </button>
//             </div>
//           )}
//           {renderComments(comments, comment._id)}
//         </div>
//       ));
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <>
//       <NavbarComponent />
//       {communitiesDiscussions?.map((data:any, index:any) => (
//         <div key={index} className="container mx-auto p-4">
//           <div className="bg-white p-4 rounded shadow-md mb-4">
//             <div className="flex items-center mb-2">
//               <img src={data?.discussion?.createdBy?.photo} alt={data?.discussion?.createdBy?.name} className="w-10 h-10 rounded-full object-cover" />
//               <div className="ml-2">
//                 <div className="font-semibold">{data?.discussion.createdBy.name}</div>
//                 <div className="text-gray-500 text-sm">{TimeAgo(data?.discussion.createdAt)}</div>
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold mb-2">{data?.discussion.title}</h1>
//             <div className="prose mb-4" dangerouslySetInnerHTML={{ __html: data?.discussion.content }} />
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center">
//                 <BiUpvote className="mr-1 text-green-500 font-sans" size={25} />
//                 {data?.discussion?.upvotes?.length}
//               </div>
//               <div className="flex items-center">
//                 <BiDownvote className="mr-1 text-red-500" size={25} />
//                 {data?.discussion?.downvotes?.length}
//               </div>
//               <div className="flex items-center">
//                 <BiCommentDetail className="mr-1" size={25} />
//                 {data?.discussion?.comments?.length}
//               </div>
//             </div>
//           </div>

//           <div className="mt-4">
//             <textarea
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none"
//               placeholder="Add a comment..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <button onClick={() => handleAddComment()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mt-2">
//               Add Comment
//             </button>
//           </div>

//           <div className="bg-white p-4 rounded shadow-md mb-4">
//             <h2 className="text-xl font-semibold mb-2">Comments</h2>
//             {renderComments(data?.comments)}
//           </div>
//         </div>
//       ))}
//       <Footer />
//     </>
//   );
// };

// export default DiscussionPage;



'use client';

import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown, FaReply } from 'react-icons/fa';
import { getCommunityDiscussion, addDiscussionComment } from '@/actions/CommunityDiscussion';
import { BiUpvote, BiDownvote, BiCommentDetail } from 'react-icons/bi';
import { NavbarComponent } from '@/components/Navbar';
import Footer from '@/components/Footer';
import moment from 'moment';
import { CircularProgress } from '@mui/material';

const DiscussionPage = () => {
  const [isReplyAdded,setIsReplyAdded] = useState(false);
  const [isCommentAdded,setIsCommentAdded] = useState(false);
  const [isRelpyLoading,setIsReplyLoading] = useState(false);
  
  const [newComment, setNewComment] = useState('');
  const [replyCommentId, setReplyCommentId] = useState(null);
  const { communitiesDiscussions, isLoading } = useSelector((state:any) => state.communitiesDiscussions);
  const { discussionSlug } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);

  useEffect(() => {
    if (discussionSlug) {
      dispatch<any>(getCommunityDiscussion({ discussionSlug:discussionSlug }));
    }
  }, [discussionSlug]);

  const handleAddComment = async (parentCommentId = null) => {
    if (!newComment) return;
    try {
      const discussionId = communitiesDiscussions?.[0]?.discussion?.discussionId;
      await dispatch<any>(addDiscussionComment({ discussionId:discussionId, content: newComment, parentComment:parentCommentId, createdBy:user?.user?.userId }));
      setNewComment('');
      setReplyCommentId(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  function TimeAgo(commentedAt:any) {
    const time = moment(commentedAt);
    const differenceInMinutes = moment().diff(time, 'minutes');

    if (differenceInMinutes < 1) {
      return <span>just now</span>;
    } else if (differenceInMinutes < 60) {
      return <span>about {differenceInMinutes} minute{differenceInMinutes !== 1 ? 's' : ''} ago</span>;
    } else if (differenceInMinutes < 1440) {
      const hours = Math.floor(differenceInMinutes / 60);
      return <span>about {hours} hour{hours !== 1 ? 's' : ''} ago</span>;
    } else {
      const days = Math.floor(differenceInMinutes / 1440);
      return <span>about {days} day{days !== 1 ? 's' : ''} ago</span>;
    }
  }

  const renderComments = (comments:any, parentCommentId = null) => {
    return comments
      .filter((comment:any) => comment.parentComment === parentCommentId)
      .map((comment:any) => (
        <div key={comment._id} style={{ position: 'relative', paddingLeft: '30px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img src={comment.createdBy.photo} alt={comment.createdBy.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }} />
            <div>
              <div style={{ fontWeight: 'bold' }}>{comment.createdBy.name}</div>
              <div style={{ color: '#888', fontSize: '12px' }}>{TimeAgo(comment.createdAt)}</div>
            </div>
          </div>
          <div style={{ backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '5px' }}>{comment.content}</div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#888', marginTop: '10px' }}>
            <button style={{ display: 'flex', alignItems: 'center', color: '#0a0' }}>
              <BiUpvote style={{ marginRight: '5px' }} /> {comment.upvotes.length}
            </button>
            <button style={{ display: 'flex', alignItems: 'center', color: '#a00', marginLeft: '15px' }}>
              <BiDownvote style={{ marginRight: '5px' }} /> {comment.downvotes.length}
            </button>
            <button style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }} onClick={() => setReplyCommentId(comment._id)}>
              <FaReply style={{ marginRight: '5px' }} /> Reply
            </button>
          </div>
          {replyCommentId === comment._id && (
            <div style={{ marginTop: '10px' }}>
              <textarea
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', outline: 'none' }}
                placeholder="Add a reply..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={() => handleAddComment(comment._id)} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', marginTop: '10px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                {isLoading ? (
                  <>
                  <CircularProgress />
                  <span className='ml-2'>Replying...</span>
                  </>
                ) : isReplyAdded ?(
                  <>
                  <span>Reply Added</span>
                  </>
                ) :(
                  <span>Reply</span>
                )

                }
              
              </button>
            </div>
          )}
          <div style={{ position: 'absolute', top: '0', left: '10px', width: '2px', height: '100%', background: '#ddd' }}></div>
          {renderComments(comments, comment._id)}
        </div>
      ));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <NavbarComponent />
      {communitiesDiscussions?.map((data:any, index:any) => (
        <div key={index} className="container mx-auto p-4">
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <div className="flex items-center mb-2">
              <img src={data?.discussion?.createdBy?.photo} alt={data?.discussion?.createdBy?.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="ml-2">
                <div className="font-semibold">{data?.discussion.createdBy.name}</div>
                <div className="text-gray-500 text-sm">{TimeAgo(data?.discussion.createdAt)}</div>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">{data?.discussion.title}</h1>
            <div className="prose mb-4" dangerouslySetInnerHTML={{ __html: data?.discussion.content }} />
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <BiUpvote className="mr-1 text-green-500 font-sans" size={25} />
                {data?.discussion?.upvotes?.length}
              </div>
              <div className="flex items-center">
                <BiDownvote className="mr-1 text-red-500" size={25} />
                {data?.discussion?.downvotes?.length}
              </div>
              <div className="flex items-center">
                <BiCommentDetail className="mr-1" size={25} />
                {data?.discussion?.comments?.length}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={() => handleAddComment()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mt-2">
              Add Comment
            </button>
          </div>

          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            {renderComments(data?.comments)}
          </div>
        </div>
      ))}
      <Footer />
    </>
  );
};

export default DiscussionPage;
