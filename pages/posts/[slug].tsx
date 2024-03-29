import { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request'
import NavBar from '../../components/navBar';
import { AiOutlineArrowLeft, AiOutlineShareAlt, AiOutlineLike, AiFillLike } from 'react-icons/ai'
import Link from 'next/link';
import FooterIcons from '../../components/footerIcons'
import styles from '../../styles/Slug.module.css'
import ShareScreen from '../../components/shareScreen';
import { getSession, useSession } from 'next-auth/react';
import { Context } from 'vm';
import router from 'next/router';
//import LikeBtn from '../../components/likeBtn';

const graphcms = new GraphQLClient(
    'https://api-ap-southeast-2.hygraph.com/v2/clazxnzw1231r01uhc0ke79zu/master'
);

const QUERY = gql
`
  query Post($slug: String!) {
    post(where: {slug: $slug}) {
      id
      title
      publishDate
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverImage {
        url
      }
      likes
    }
  }
`;

const SLUGLIST = gql`
    {
        posts {
            slug
        }
    }
`;


const LIKEPOST = gql`
  mutation likePost($id: ID!, $likes: [String!]) {
    updatePost(where: {id: $id}, data: {likes: $likes}) {
      id
      likes
    }
    publishPost(where: {id: $id}, to: [PUBLISHED]) {
      id
      likes
    }
  }  
`;
  
export async function getStaticPaths() {
    const { posts }: {posts:Array<any>} = await graphcms.request(SLUGLIST);

    return {
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: false,
    };
}

  
export async function getStaticProps({ params }: {params:any}) {
    const slug = params.slug;
    const data = await graphcms.request(QUERY, {slug});
    const post = data.post;

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
}

export default function BlogPost({ post }: {post:any}) {
    const [likeIcon, setLikeIcon] = useState(false)
    const [show, setShow] = useState(false)
    const { data: session } = useSession()
    const id = post.id
    const likes:any[] = post.likes
    let numLikes = likes.length;

    useEffect(() => {
        const interval = setInterval(() => {
            if (post.likes?.includes(session?.user?.email)) {
                setLikeIcon(true)
            } else {
                setLikeIcon(false)
            }
        }, 1000);

        return () => clearInterval(interval);
    });
    
    function changeLikeIcon() {
        if (likeIcon) {
            setLikeIcon(false)
        } else {
            setLikeIcon(true)
        }
    }

    function likeBtn() {
        // save slug for later
        localStorage.setItem("postSlug", post.slug)

        // if user logged in, add like to article; else login
        if (!session) {
            router.push('/login')
        } else if (post.likes.includes(session.user?.email)) {
            // user already liked post, unlike
            const index = post.likes.indexOf(session.user?.email)
            likes.splice(index, 1)
            graphcms.request(LIKEPOST, {id, likes})
        } else {
            // user not yet liked post, like
            likes.push(session.user?.email)
            graphcms.request(LIKEPOST, {id, likes})
        }

    }

    return (
        <main className='font-FiraCode bg-gradient-to-br from-c-charcoal to-c-blue text-c-white h-screen min-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-c-green scrollbar-track-c-blue'>
            <div className='h-full flex flex-col justify-between'>
                <div>
                    
                    {
                        show && <div className='flex flex-col justify-center items-center h-screen w-screen fixed bg-c-blue bg-opacity-50' onClick={() => setShow(!show)}>
                                    <div className='flex flex-col justify-center items-center bg-gradient-to-br from-c-charcoal to-c-blue shadow-2xl py-10 px-24 rounded-xl gap-y-8' onClick={e => e.stopPropagation()}>
                                        <button className='hover:bg-c-blue active:opacity-90 border-c-green border-2 text-c-green rounded-full py-2 px-5' onClick={() => setShow(!show)}>Close</button>
                                        <ShareScreen slug={post.slug} title={post.title}/>
                                    </div>
                                </div>
                    }

                    <section className='hidden md:block'>
                        <NavBar/>
                    </section>

                    {/* Cover */}
                    <section className='animate-fade-in-down'>
                        <div className='flex justify-center'>
                            <img className='coverImg shadow-2xl p-2 object-cover w-full h-80 max-w-6xl' src={post.coverImage.url} alt={'Cover Image'}/>
                        </div>

                        <div className='px-4 -mt-7 max-w-6xl mx-auto flex justify-between'>
                            <div className=''>
                                <Link href={'/blog'}>
                                    <div className='p-1.5 bg-c-white shadow-2xl rounded-full w-fit hover:translate-y-1 active:opacity-90'><AiOutlineArrowLeft color='#221D23' size={25}/></div>
                                </Link>
                            </div>
                            <div className='flex gap-x-4'>
                                <div onClick={() => setShow(!show)}>
                                    <div className='p-1.5 bg-c-white shadow-2xl rounded-full w-fit hover:translate-y-1 active:opacity-90'><AiOutlineShareAlt color='#221D23' size={25}/></div>
                                </div>
                                <button onClick={() => { likeBtn(); changeLikeIcon()}}>
                                    <div className='p-1.5 bg-c-white shadow-2xl rounded-full w-fit hover:translate-y-1 active:opacity-90' onClick={() => {
                                        if (likeIcon) {
                                            setLikeIcon(false)
                                        } else {
                                            setLikeIcon(true)
                                        }
                                    }}>
                                        {
                                            (likeIcon && <AiFillLike color='#221D23' size={25}/>)
                                            ||
                                            (!likeIcon && <AiOutlineLike color='#221D23' size={25}/>)
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Title and content */}
                    <section className='mb-auto px-10 pt-5 pb-5 flex justify-center animate-fade-in-up'>
                        <div className='font-CormorantG'>
                            <div className='flex justify-between font-semibold border-b-2 border-c-grey p-2 mb-4'>
                                <div className='flex gap-x-4 pb-2'>
                                    <img className='flatImg w-12 h-auto my-auto' src={post.author.avatar.url} alt="Author Avatar" />
                                    <div className='my-auto'>
                                        <p className='text-xl text-c-grey'>Written by:</p>
                                        <p className='text-xl'>{post.author.name}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className='my-auto text-c-grey'>
                                        <p>Likes: <span className='text-c-green'>{numLikes}</span></p>
                                    </div>
                                    <div className='my-auto'>
                                        <p className='text-xl'>{post.publishDate}</p>
                                    </div>
                                </div>
                            </div>
                            <h1 className='max-w-5xl px-6 md:px-0 text-4xl pb-2 whitespace-pre-wrap'>{post.title}</h1>
                            <div className='px-6 md:px-0 w-screen max-w-xl md:max-w-2xl lg:max-w-3xl whitespace-pre-wrap mx-auto'>
                                <div dangerouslySetInnerHTML={{ __html: post.content.html }} className={styles.content}></div>
                            </div>
                        </div>
                    </section>

                </div>
                <div>

                    {/* Socials */}
                    <section>
                        <FooterIcons/>
                    </section>
                </div>

            </div>
        </main>
    )
}